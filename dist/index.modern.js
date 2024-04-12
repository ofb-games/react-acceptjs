import * as React from 'react';
import React__default, { useState, useEffect } from 'react';
import { jsxs, jsx } from 'react/jsx-runtime';

var cachedScripts = [];
function useScript(url, async, appendToHeadOrBody) {
    if (async === void 0) { async = true; }
    if (appendToHeadOrBody === void 0) { appendToHeadOrBody = 'head'; }
    var _a = React.useState({
        loaded: false,
        error: false,
    }), state = _a[0], setState = _a[1];
    React.useEffect(function () {
        if (cachedScripts.includes(url)) {
            setState({
                loaded: true,
                error: false,
            });
        }
        else {
            cachedScripts.push(url);
            var script_1 = document.createElement('script');
            script_1.src = url;
            script_1.async = async;
            var onScriptLoad_1 = function () {
                setState({
                    loaded: true,
                    error: false,
                });
            };
            var onScriptError_1 = function () {
                var index = cachedScripts.indexOf(url);
                if (index >= 0)
                    cachedScripts.splice(index, 1);
                script_1.remove();
                setState({
                    loaded: true,
                    error: true,
                });
            };
            script_1.addEventListener('load', onScriptLoad_1);
            script_1.addEventListener('error', onScriptError_1);
            appendToHeadOrBody === 'head'
                ? document.head.appendChild(script_1)
                : document.body.appendChild(script_1);
            return function () {
                script_1.removeEventListener('load', onScriptLoad_1);
                script_1.removeEventListener('error', onScriptError_1);
            };
        }
        return undefined;
    }, [url, async, appendToHeadOrBody]);
    return [state.loaded, state.error];
}

var useAcceptJs = function (_a) {
    var _b = _a.environment, environment = _b === void 0 ? 'SANDBOX' : _b, authData = _a.authData;
    var _c = useState(true), loading = _c[0], setLoading = _c[1];
    var scriptUrl = environment === 'PRODUCTION'
        ? 'https://js.authorize.net/v1/Accept.js'
        : 'https://jstest.authorize.net/v1/Accept.js';
    var _d = useScript(scriptUrl), scriptLoaded = _d[0], scriptError = _d[1];
    useEffect(function () {
        if (scriptLoaded || scriptError) {
            setLoading(false);
        }
    }, [scriptLoaded, scriptError]);
    var dispatchData = function (paymentData) {
        var payload = paymentData.cardData
            ? { cardData: paymentData.cardData, authData: authData }
            : { bankData: paymentData.bankData, authData: authData };
        return new Promise(function (resolve, reject) {
            if (window) {
                window.Accept.dispatchData(payload, function (response) {
                    if (response.messages.resultCode === 'Ok') {
                        resolve(response);
                    }
                    reject(response);
                });
            }
        });
    };
    return { dispatchData: dispatchData, loading: loading, error: scriptError };
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/**
 * `useDynamicScript()` is similar to `useScript()` - the key difference
 * being `useDynamicScript()` will remove the `<script>` tag from the DOM
 * before the component is removed.
 */
function useDynamicScript(url, async, appendToHeadOrBody) {
    if (async === void 0) { async = true; }
    if (appendToHeadOrBody === void 0) { appendToHeadOrBody = 'head'; }
    var _a = React.useState({
        loaded: false,
        error: false,
    }), state = _a[0], setState = _a[1];
    React.useEffect(function () {
        var script = document.createElement('script');
        script.src = url;
        script.async = async;
        var onScriptLoad = function () {
            setState({
                loaded: true,
                error: false,
            });
        };
        var onScriptError = function () {
            script.remove();
            setState({
                loaded: true,
                error: true,
            });
        };
        script.addEventListener('load', onScriptLoad);
        script.addEventListener('error', onScriptError);
        appendToHeadOrBody === 'head'
            ? document.head.appendChild(script)
            : document.body.appendChild(script);
        return function () {
            script.removeEventListener('load', onScriptLoad);
            script.removeEventListener('error', onScriptError);
            script.remove();
        };
    }, [url, async, appendToHeadOrBody]);
    return [state.loaded, state.error];
}

var HostedForm = function (_a) {
    var authData = _a.authData, onSubmit = _a.onSubmit, _b = _a.environment, environment = _b === void 0 ? 'SANDBOX' : _b, _c = _a.billingAddressOptions, billingAddressOptions = _c === void 0 ? { show: true, required: true } : _c, _d = _a.buttonText, buttonText = _d === void 0 ? 'Pay' : _d, _e = _a.formButtonText, formButtonText = _e === void 0 ? 'Pay' : _e, _f = _a.formHeaderText, formHeaderText = _f === void 0 ? 'Pay' : _f, _g = _a.paymentOptions, paymentOptions = _g === void 0 ? { showCreditCard: true, showBankAccount: false } : _g, buttonStyle = _a.buttonStyle, buttonClassName = _a.buttonClassName, errorTextStyle = _a.errorTextStyle, errorTextClassName = _a.errorTextClassName, containerStyle = _a.containerStyle, containerClassName = _a.containerClassName, disabled = _a.disabled;
    var _h = React.useState(true), loading = _h[0], setLoading = _h[1];
    var scriptUrl = environment === 'PRODUCTION'
        ? 'https://js.authorize.net/v3/AcceptUI.js'
        : 'https://jstest.authorize.net/v3/AcceptUI.js';
    var _j = useDynamicScript(scriptUrl), scriptLoaded = _j[0], scriptError = _j[1];
    React.useEffect(function () {
        if (scriptLoaded || scriptError) {
            setLoading(false);
        }
    }, [scriptLoaded, scriptError]);
    var _k = React.useState(null), errors = _k[0], setErrors = _k[1];
    var responseHandler = React.useCallback(function (response) {
        if (response.messages.resultCode === 'Error') {
            setErrors(response.messages.message);
        }
        else {
            onSubmit(response);
        }
    }, [onSubmit]);
    React.useEffect(function () {
        if (!scriptError && !loading) {
            window.responseHandler = responseHandler;
        }
        if (scriptError)
            setErrors('There was a problem loading the Accept.JS script. Please try again.');
    }, [loading, scriptError, responseHandler]);
    return (jsxs("div", __assign({ style: containerStyle, className: containerClassName ? containerClassName : undefined }, { children: [jsx("button", __assign({ type: "button", style: buttonStyle, className: buttonClassName ? "AcceptUI ".concat(buttonClassName) : 'AcceptUI', "data-billingaddressoptions": JSON.stringify(billingAddressOptions), "data-apiloginid": authData.apiLoginID, "data-clientkey": authData.clientKey, "data-acceptuiformbtntxt": formButtonText, "data-acceptuiformheadertxt": formHeaderText, "data-paymentoptions": JSON.stringify(paymentOptions), "data-responsehandler": "responseHandler", disabled: scriptError || loading || disabled }, { children: buttonText })), errors && (jsx("div", __assign({ style: errorTextStyle, className: errorTextClassName !== null && errorTextClassName !== void 0 ? errorTextClassName : '' }, { children: typeof errors === 'string'
                    ? errors
                    : errors.map(function (error, index) { return (jsxs("div", { children: ["`Error ($", error.code, "): $", error.text, ")`"] }, "error-".concat(index))); }) })))] })));
};

var RedirectIntegration = function (_a) {
    var formToken = _a.formToken, postUrl = _a.postUrl, children = _a.children, className = _a.className, style = _a.style;
    return (jsxs("form", __assign({ method: "post", action: postUrl }, { children: [jsx("input", { type: "hidden", name: "token", value: formToken }), jsx("button", __assign({ className: className, style: className ? {} : style }, { children: children }))] })));
};

var parseQueryString = function (queryString) {
    var arr = queryString.split('&');
    return arr.reduce(function (acc, curr) {
        var _a = curr.split('='), key = _a[0], value = _a[1];
        acc[key] = value;
        return acc;
    }, {});
};

var defaultBackdropStyle = {
    position: 'fixed',
    left: '0px',
    top: '0px',
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: '#808080',
    opacity: '0.5',
    filter: 'alpha(opacity=50)',
};
var defaultContainerStyle = {
    borderRadius: '6px',
    position: 'fixed',
    boxShadow: 'rgba(0, 0, 0, 0.4) 5px 5px 16px',
    zIndex: 999999,
    display: 'block',
    overflow: 'hidden',
    left: '50%',
    top: '50%',
    backgroundColor: '#ffffff',
};

function useWindowSize() {
    var _a = useState({
        width: undefined,
        height: undefined,
    }), windowSize = _a[0], setWindowSize = _a[1];
    useEffect(function () {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return function () { return window.removeEventListener('resize', handleResize); };
    }, []);
    return windowSize;
}

var IFrameIntegrationContext = React__default.createContext(null);
var useIFrameIntegrationContext = function () {
    var context = React__default.useContext(IFrameIntegrationContext);
    if (!context) {
        throw new Error("AcceptHosted compound components cannot be rendered outside the AcceptHosted component");
    }
    return context;
};
var IFrameIntegration = function (_a) {
    var formToken = _a.formToken, postUrl = _a.postUrl, onTransactionResponse = _a.onTransactionResponse, onCancel = _a.onCancel, onSuccessfulSave = _a.onSuccessfulSave, onResize = _a.onResize, children = _a.children;
    var _b = React__default.useState(false), popupIsShown = _b[0], setPopupIsShown = _b[1];
    var popupFormRef = React__default.useRef(null);
    var popupRef = React__default.useRef(null);
    var iFrameRef = React__default.useRef(null);
    var handleShowPopup = function () {
        setPopupIsShown(true);
    };
    var handleClosePopup = function () {
        setPopupIsShown(false);
    };
    var contextValue = {
        popupIsShown: popupIsShown,
        popupFormRef: popupFormRef,
        popupRef: popupRef,
        iFrameRef: iFrameRef,
        formToken: formToken,
        postUrl: postUrl,
        handleShowPopup: handleShowPopup,
        handleClosePopup: handleClosePopup,
    };
    var centerPopup = function () {
        console.log('centering popup....');
        if (popupRef.current) {
            popupRef.current.style.left = '50%';
            popupRef.current.style.top = '50%';
            var left = -Math.floor(popupRef.current.clientWidth / 2);
            var top_1 = -Math.floor(popupRef.current.clientHeight / 2);
            popupRef.current.style.marginLeft = "".concat(left.toString(), "px");
            popupRef.current.style.marginTop = "".concat(top_1.toString(), "px");
            popupRef.current.style.zIndex = '2';
            if (popupRef.current.offsetLeft < 16) {
                popupRef.current.style.left = '16px';
                popupRef.current.style.right = '16px';
            }
            if (popupRef.current.offsetTop < 16) {
                popupRef.current.style.top = '16px';
                popupRef.current.style.marginTop = '0px';
            }
        }
    };
    React__default.useEffect(function () {
        if (popupIsShown) {
            centerPopup();
        }
    }, [popupIsShown]);
    React__default.useEffect(function () {
        if (!window.AuthorizeNetIFrame) {
            window.AuthorizeNetIFrame = {
                onReceiveCommunication: function (querystr) {
                    var params = parseQueryString(querystr);
                    switch (params['action']) {
                        case 'successfulSave':
                            if (onSuccessfulSave)
                                onSuccessfulSave();
                            handleClosePopup();
                            break;
                        case 'cancel':
                            if (onCancel)
                                onCancel();
                            handleClosePopup();
                            break;
                        case 'transactResponse':
                            var response = params['response'];
                            var parsedResponse = void 0;
                            if (response) {
                                parsedResponse = JSON.parse(response);
                                onTransactionResponse(parsedResponse);
                            }
                            else {
                                console.error('Did not receive a transaction response despite receiving a transactResponse action!');
                            }
                            handleClosePopup();
                            break;
                        case 'resizeWindow':
                            var width = params['width'];
                            var height = params['height'];
                            if (width && height) {
                                var w = parseInt(width);
                                var h = parseInt(height);
                                if (iFrameRef.current && popupRef.current) {
                                    iFrameRef.current.style.width = '100%';
                                    iFrameRef.current.style.height = "".concat(h.toString(), "px");
                                    popupRef.current.style.height = "".concat(h.toString(), "px");
                                    // centerPopup();
                                }
                                if (onResize)
                                    onResize(w, h);
                            }
                            break;
                    }
                },
            };
        }
    });
    return (jsx(IFrameIntegrationContext.Provider, __assign({ value: contextValue }, { children: children })));
};
var IFrameIntegrationButton = function (_a) {
    var children = _a.children, className = _a.className;
    var _b = useIFrameIntegrationContext(), postUrl = _b.postUrl, handleShowPopup = _b.handleShowPopup, formToken = _b.formToken, popupIsShown = _b.popupIsShown;
    return (jsxs("form", __assign({ method: "post", action: postUrl, id: "formAuthorizeNetPopup", name: "formAuthorizeNetPopup", target: "iframeAuthorizeNet", onSubmit: handleShowPopup }, { children: [jsx("input", { type: "hidden", id: "popupToken", name: "token", value: formToken }), jsx("button", __assign({ disabled: popupIsShown, className: className }, { children: children }))] })));
};
var IFrameContainer = function (_a) {
    var children = _a.children, className = _a.className, style = _a.style;
    var _b = useIFrameIntegrationContext(), popupIsShown = _b.popupIsShown, popupRef = _b.popupRef;
    console.log('popupIsShown:', popupIsShown);
    console.log('popupRef', popupRef);
    var windowSize = useWindowSize();
    var _c = React__default.useState(0), offsetWidth = _c[0], setOffsetWidth = _c[1];
    var _d = React__default.useState(0), offsetHeight = _d[0], setOffsetHeight = _d[1];
    // React.useEffect(() => {
    //   if (popupIsShown) {
    //     debugger;
    //   }
    // }, [popupIsShown]);
    React__default.useEffect(function () {
        var _a, _b;
        console.log('In useEffect...');
        setOffsetWidth(Math.floor((((_a = popupRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth) || 0) / 2));
        setOffsetHeight(Math.floor((((_b = popupRef.current) === null || _b === void 0 ? void 0 : _b.clientHeight) || 0) / 2));
    }, [popupRef]);
    return (jsx("div", __assign({ className: className, ref: popupRef, style: className
            ? { display: popupIsShown ? '' : 'none' }
            : __assign(__assign(__assign({}, defaultContainerStyle), style), { display: popupIsShown ? '' : 'none', width: windowSize.width
                    ? windowSize.width > 576
                        ? '70%'
                        : '300px'
                    : '300px', height: '90%', marginLeft: "-".concat(offsetWidth, "px"), marginTop: "-".concat(offsetHeight, "px") }) }, { children: children })));
};
var IFrameBackdrop = function (_a) {
    var className = _a.className, style = _a.style;
    var popupIsShown = useIFrameIntegrationContext().popupIsShown;
    return (jsx("div", { className: className, style: className
            ? { display: popupIsShown ? '' : 'none' }
            : __assign(__assign(__assign({}, defaultBackdropStyle), style), { display: popupIsShown ? '' : 'none' }) }));
};
var IFrame = function (_a) {
    var className = _a.className, style = _a.style;
    return (jsx("iframe", { name: "iframeAuthorizeNet", id: "iframeAuthorizeNet", frameBorder: "0", width: "100%", height: "100%", className: className, style: className ? {} : style }));
};

var AcceptHosted = function (props) {
    var postUrl = props.environment === 'PRODUCTION'
        ? 'https://accept.authorize.net/payment/payment'
        : 'https://test.authorize.net/payment/payment';
    if (props.integration === 'redirect') {
        return (jsx(RedirectIntegration, __assign({ formToken: props.formToken, postUrl: postUrl }, { children: props.children })));
    }
    if (props.integration === 'iframe') {
        return (jsx(IFrameIntegration, __assign({ formToken: props.formToken, postUrl: postUrl, onTransactionResponse: props.onTransactionResponse, onCancel: props.onCancel, onResize: props.onResize, onSuccessfulSave: props.onSuccessfulSave }, { children: props.children })));
    }
    return null;
};
AcceptHosted.Button = IFrameIntegrationButton;
AcceptHosted.IFrameContainer = IFrameContainer;
AcceptHosted.IFrameBackdrop = IFrameBackdrop;
AcceptHosted.IFrame = IFrame;

export { AcceptHosted, HostedForm, useAcceptJs };
//# sourceMappingURL=index.modern.js.map
