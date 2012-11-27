if (typeof (KLEE) === 'undefined')
{ KLEE = {}; }
// Create Namespace container for functions in this library;
KLEE.Common = (function () {
    var _classObject;
    var registeredClass = [];
    var _onLoad = function () {
        var i;
        var item;
        for (i = 0; i < registeredClass.length; i++) {
            _classObject = registeredClass[i];
            for (item in _classObject) {
                if (typeof (_classObject[item]) === 'object') {
                    if (_classObject[item].onchange !== undefined && typeof (_classObject[item].onchange) === 'function' && _classObject[item].ID !== undefined) {
                        if (Xrm.Page.getAttribute(_classObject[item].ID) === null) {
                            alert("Le champ '" + _classObject[item].ID + "' n'est pas présent sur le formulaire !");
                            continue;
                        }
                        Xrm.Page.getAttribute(_classObject[item].ID).addOnChange(this.onchange);
                        if ($('#' + _classObject[item].ID).attr('type') === 'checkbox') {
                            $('#' + _classObject[item].ID).click(function () {
                                $(this).blur();
                                $(this).focus();
                            });
                        }
                    }
                }
            }
            if (_classObject.OnLoad !== undefined && typeof (_classObject.OnLoad) === 'function') {
                _classObject.OnLoad(KLEE.Common);
            }
        }
    };
    var _onsave = function (event) {
        var item;
        if (_classObject === undefined || _classObject === null) {
            return true;
        }
        if (_classObject.OnSave !== undefined && Xrm.Page.data.entity.getIsDirty()) {
            return _classObject.OnSave(KLEE.Common);
        }
        return true;
    };
    var _onchange = function (event) {
        var item;
        if (_classObject === undefined || _classObject === null) {
            return true;
        }
        for (item in _classObject) {
            if (_classObject[item].ID !== undefined && _classObject[item].ID === event.getEventSource().getName()) {
                return _classObject[item].onchange(KLEE.Common.getField(_classObject[item].ID), KLEE.Common, event);
            }
        }
        return true;
    };
    var _getField = function (fieldID) {
        if (Xrm.Page.data.entity.attributes.get(fieldID) === null) {
            alert("Le champ '" + fieldID + "' n'est pas présent sur le formulaire !");
            return null;
        }
        return {
            data: Xrm.Page.data.entity.attributes.get(fieldID),
            ui: Xrm.Page.ui.controls.get(fieldID),
            getValue: function () {
                return this.data.getValue();
            },
            setValue: function (value) { return this.data.setValue(value); },
            setDisabled: function (value) { return this.ui.setDisabled(value); },
            setVisible: function (value) { return this.ui.setVisible(value); },
            setLookup: function (entityName, id, name) {
                if (entityName === undefined) {
                    alert("Il faut entrer un nom d'entité pour setLookup du champ " + this.ui.getName() + ".");
                    return;
                }
                if (id === undefined) {
                    alert("Il faut entrer un id pour setLookup du champ " + this.ui.getName() + ".");
                    return;
                }
                var array = [];
                var lookup = {};
                lookup.id = id;
                lookup.entityType = entityName;
                lookup.typename = entityName;
                if (name !== undefined) {
                    lookup.name = name;
                } else {
                    lookup.name = '';
                }
                array.push(lookup);
                this.data.setValue(array);
            },
            getLookup: function () {
                var value = this.data.getValue();
                if (value !== null) {
                    return value[0];
                } else {
                    return null;
                }
            }
        };
    };
    var _getSection = function (tabId, sectionId) {
        var tab;
        Xrm.Page.ui.tabs.forEach(function (tabTemp, index) {
            if ((typeof (tabId) === 'string' && tabTemp.getName() === tabId) || index === tabId) {
                tab = tabTemp;
            }
        });

        if (tab === undefined) {
            return null;
        }
        var section = null;
        tab.sections.forEach(function (sectionTemp, index) {
            if ((typeof (sectionId) === 'string' && sectionTemp.getName() === sectionId) || sectionId === index) {
                section = sectionTemp;
            }
        });
        return section;
    };
    var _register = function (classe) {
        registeredClass.push(classe);
    };

    var _context = function () {
        var errorMessage = "Context is not available.";
        if (typeof GetGlobalContext != "undefined")
        { return GetGlobalContext(); }
        else {
            if (typeof Xrm != "undefined") {
                return Xrm.Page.context;
            }
            else
            { return new Error(errorMessage); }
        }
    };

    var _serverUrl = function () {
        ///<summary>
        /// Private function used to establish the path to the REST endpoint based on context
        /// provided by the Xrm.Page object or the context object returned by the GlobalContext object.
        ///</summary>
        var serverUrl = _context().getServerUrl();
        if (serverUrl.match(/\/$/)) {
            serverUrl = serverUrl.substring(0, serverUrl.length - 1);
        }
        return serverUrl + "/XRMServices/2011/OrganizationData.svc";
    };

    /*var ODATA_ENDPOINT = "/" + Xrm.Page.context.getOrgUniqueName() + "/XRMServices/2011/OrganizationData.svc";
    var context = Xrm.Page.context || GetGlobalContext();
    var serverUrl = context.getServerUrl();*/

    var _doRequest = function (options, async, internalCallback) {
        // default settings
        var settings = {
            type: "GET",
            async: async,
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            beforeSend: function (request) {
                request.setRequestHeader("Accept", "application/json");
            },
            error: function (XmlHttpRequest, textStatus, errorThrown) {
                alert("Error : " + textStatus + ": " + XmlHttpRequest.statusText);
            }
        };
        // merge the default-settings with the options-object
        options = $.extend(settings, options);
        if (!async) {
            var result = $.ajax(options).responseText;
            var jsonResult = (result) ? $.parseJSON(result).d : null;
            return !!internalCallback ? internalCallback(jsonResult) : jsonResult;
        }
        else {
            settings.success = function (data, textStatus, XmlHttpRequest) {
                internalCallback(data.d);
            };
            $.ajax(options);
        }
    };

    var _retrieve = function (entityName, id, columns, complement, callback) {
        var async = !!callback;
        var setName = entityName + 'Set';
        var query = _serverUrl() + "/" + setName + "(guid'" + id + "')" + (complement == undefined ? '' : complement) + "?$select=" + columns.join(',');
        return _doRequest({ url: query }, async, function (result) {
            if (async) {
                callback(result);
            } else {
                return result;
            }
        });
    };

    var _retrieveMultiple = function (entityName, columns, filter, callback) {
        // var async = !!callback;
        var setName = entityName + 'Set';
        filter = (filter) ? "&$filter=" + filter : '';
        var query = _serverUrl() + "/" + setName + "()" + "?$select=" + columns.join(',') + filter;
        var performRequest = function (query, fnCallback) {
            var async = !!fnCallback;
            return _doRequest({ url: query }, async, function (data) {
                var next = data.__next || null;
                var results = data.results || data;
                var response = { 'results': results, 'next': next };
                // enable eage loading
                if (next) {
                    response.LoadNext = function (callback) {
                        return performRequest(next, callback);
                    };
                }
                if (async) {
                    fnCallback(response);
                } else {
                    return response;
                }
            });
        };
        return performRequest(query, callback);
    };

    var _created = function (entityName, entityObject, callback) {
        var async = !!callback;
        var setName = entityName + 'Set';
        var json = window.JSON.stringify(entityObject);
        var query = _serverUrl() + "/" + setName;
        var options = { type: "POST", url: query, data: json };
        return _doRequest(options, async, function (result) {
            if (async) {
                callback(result);
            } else {
                return result;
            }
        });
    };

    var _update = function (entityName, id, entityObject, callback) {
        var async = !!callback;
        var setName = entityName + 'Set';
        var json = window.JSON.stringify(entityObject);
        var _id = id;
        var query = _serverUrl() + "/" + setName + "(guid'" + _id + "')";
        var options = {
            type: "POST",
            url: query,
            data: json,
            beforeSend: function (request) {
                request.setRequestHeader("Accept", "application/json");
                request.setRequestHeader("X-HTTP-Method", "MERGE");
            }
        };
        // MERGE methode does not return data
        return _doRequest(options, async, function () {
            if (async) {
                callback(_id);
            } else {
                return _id;
            }
        });
    };

    var _delete = function (entityName, id, callback) {
        var async = !!callback;
        var setName = entityName + 'Set';
        var query = _serverUrl() + '/' + setName + "(guid'" + id + "')";
        var options = {
            type: "POST",
            url: query,
            beforeSend: function (request) {
                request.setRequestHeader('Accept', 'application/json');
                request.setRequestHeader('X-HTTP-Method', 'DELETE');
            }
        };
        return _doRequest(options, async, function (result) {
            if (async) {
                callback(result);
            } else {
                return result;
            }
        });
    };
    function guidGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1).toUpperCase();
        };
        return '{' + (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()) + '}';
    };

    var _filteredLookup = function (fieldName, entityName, viewDisplayName) {
        var _columns = [];
        var _orders = [];
        var _parameters = [];
        var _conditions = [];
        var _linkEntities = [];
        var _viewId = guidGenerator();
        if (viewDisplayName === undefined) {
            viewDisplayName = 'Custom View';
        }
        this.AddColumn = function (columnName, width) {
            if (width === undefined) {
                width = 100;
            }
            var column = {
                Name: columnName,
                Width: width
            };
            _columns.push(column);
        };
        this.AddOrder = function (columnName, descending) {
            if (descending === undefined) {
                descending = 'false';
            }
            var order = {
                Name: columnName,
                Descending: descending
            };
            _orders.push(order);
        };
        this.AddLinkEntity = function (linkEntityName, xml) {
            var i;
            if (xml === undefined) {
                return;
            }
            for (i = 0; i < _linkEntities.length; i++) {
                var linkEntity = _linkEntities[i];
                if (linkEntity.Name == linkEntityName) {
                    linkEntity.Xml = xml;
                    return;
                }
            }
            var linkEntityTemp = {
                Name: linkEntityName,
                Xml: xml
            };
            _linkEntities.push(linkEntityTemp);
        };
        this.AddCondition = function (columnName, criteria, paramName) {
            var condition = {
                Name: columnName,
                Criteria: criteria,
                ParameterName: paramName
            };
            _conditions.push(condition);
        };
        this.SetParameter = function (columnName, value) {
            var i;
            if (value === undefined) {
                return;
            }
            if (value !== null && value.id !== undefined) {
                value = value.id;
            }
            for (i = 0; i < _parameters.length; i++) {
                var parameter = _parameters[i];
                if (parameter.Name === columnName) {
                    parameter.Value = value;
                    _parameters[i] = parameter;
                    return;
                }
            }
            var parameterTemp = {
                Name: columnName,
                Value: value
            };
            _parameters.push(parameterTemp);
        };
        this.Execute = function () {
            var i, j;
            var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">';
            fetchXml += '<entity name="' + entityName + '">';

            var layoutXml = '<grid name="resultset" object="1" jump="name" select="1" icon="1" preview="1">';
            layoutXml += '<row name="result" id="' + GetPrimaryColumnNameByEntityName(entityName) + '">';
            for (i = 0; i < _columns.length; i++) {
                var column = _columns[i];
                layoutXml += '<cell name="' + column.Name + '" width="' + column.Width + '" />';
                fetchXml += '<attribute name="' + column.Name + '" />';
            }
            layoutXml += '</row>';
            layoutXml += '</grid>';


            for (i = 0; i < _orders.length; i++) {
                var order = _orders[i];
                fetchXml += '<order attribute="' + order.Name + '" descending="' + order.Descending + '" />';
            }
            if (_conditions.length > 0) {
                fetchXml += '<filter type="and">';
                for (i = 0; i < _conditions.length; i++) {
                    var condition = _conditions[i];
                    if (typeof (condition.ParameterName) == 'string') {
                        for (j = 0; j < _parameters.length; j++) {
                            var parameter = _parameters[j];
                            if (parameter.Name === condition.ParameterName && parameter.Value !== null) {
                                fetchXml += '<condition attribute="' + condition.Name + '" operator="' + condition.Criteria + '" value="' + parameter.Value + '"/>';
                            }
                        }
                    } else {
                        if (condition.ParameterName.length > 0) {
                            fetchXml += '<filter type="or">';
                            for (k = 0; k < condition.ParameterName.length; k++) {
                                var paramName = condition.ParameterName[k];
                                for (j = 0; j < _parameters.length; j++) {
                                    var parameter = _parameters[j];
                                    if (parameter.Name === paramName && parameter.Value !== null) {
                                        fetchXml += '<condition attribute="' + condition.Name + '" operator="' + condition.Criteria + '" value="' + parameter.Value + '"/>';
                                    }
                                }
                            }
                            fetchXml += '</filter>';
                        }
                    }
                }
                fetchXml += '</filter>';
            }
            if (_linkEntities.length > 0) {
                for (i = 0; i < _linkEntities.length; i++) {
                    fetchXml += _linkEntities[i].Xml;
                }
            }
            fetchXml += '</entity></fetch>';
            _getField(fieldName).ui.addCustomView(_viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);

        };
        function GetPrimaryColumnNameByEntityName(entityName) {
            var i;
            var activities = ["email", "task", "phonecall", "fax", "letter", "appointment", "serviceactivity", "campaignresponse"];
            for (i = 0; i < activities.length; i++) {
                if (activities[i] === entityName) {
                    return 'activityid';
                }
            }
            return entityName + 'id';
        }
    };
    var _filteredOptionSet = function (principalFieldName, filteredFieldName) {
        var _principalFieldName = principalFieldName;
        var _filteredFieldName = filteredFieldName;
        var _newOptions = [];
        if (Xrm.Page.data.entity.attributes.get(_principalFieldName) === null) {
            alert("Le champ '" + _principalFieldName + "' n'est pas présent sur le formulaire !");
            return null;
        }
        if (Xrm.Page.data.entity.attributes.get(_filteredFieldName) === null) {
            alert("Le champ '" + _filteredFieldName + "' n'est pas présent sur le formulaire !");
            return null;
        }
        this.AddOptions = function (principalPicklistValue, filteredPicklistValues, additionalCriteria) {
            if (filteredPicklistValues !== null) {
                var val = {
                    key: principalPicklistValue,
                    values: filteredPicklistValues,
                    criteria: additionalCriteria
                };
                _newOptions.push(val);
            }
        };
        this.Execute = function () {
            var isOnChange = event !== undefined && event !== null;
            if (isOnChange) {
                _getField(_filteredFieldName).setValue(null);
                _getField(_filteredFieldName).ui.clearOptions();
            }
            var selectedOption = _getField(principalFieldName).getValue();
            var newOptions = [];
            var additionalCriteria = null;
            for (var opt in _newOptions) {
                if (selectedOption == _newOptions[opt].key) {
                    newOptions = _newOptions[opt].values;
                    additionalCriteria = _newOptions[opt].criteria;
                    break;
                }
            }

            var options = _getField(_filteredFieldName).data.getOptions();
            for (var i = 0; i < options.length; i++) {
                var option = options[i];
                var garderOption = false;
                for (var j = 0; j < newOptions.length; j++) {
                    if (option.value == newOptions[j]) {
                        garderOption = true;
                        break;
                    }
                }
                if (!isOnChange && !garderOption) {
                    _getField(_filteredFieldName).ui.removeOption(option.value);
                }
                if (isOnChange && garderOption) {
                    _getField(_filteredFieldName).ui.addOption(option);
                }
            }
            if (additionalCriteria !== null && additionalCriteria !== undefined) {
                additionalCriteria(KLEE.Common);
            }
        }
    };
    return {
        onchange: _onchange,
        OnSave: _onsave,
        getField: _getField,
        getSection: _getSection,
        OnLoad: _onLoad,
        Register: _register,
        Retrieve: _retrieve,
        RetrieveMultiple: _retrieveMultiple,
        Create: _created,
        Update: _update,
        Delete: _delete,
        FilteredLookup: _filteredLookup,
        FilteredOptionSet: _filteredOptionSet
    };
} ());