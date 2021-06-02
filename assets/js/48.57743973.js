exports.ids = [48];
exports.modules = {

/***/ 1174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_cdf818b5_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(88);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var wix_rich_content_common_dist_statics_locale_messages_en_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(193);
var wix_rich_content_common_dist_statics_locale_messages_en_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(193, 1);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wix_draft_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _wix_draft_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wix_draft_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_measure__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(112);
/* harmony import */ var wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(26);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var ricos_content__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(11);
/* harmony import */ var wix_rich_content_common_libs_deprecateHelpers__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(162);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(164);
var _errorMap,styles_toastContainer="_3vaFB",styles_close="dvacF",styles_mobile="_2DEsM",styles_error="_3nQj0",styles_success="GILJ4";function Toast(props){var isMobile=props.isMobile,isError=props.isError,message=props.message,onClose=props.onClose,style=classnames__WEBPACK_IMPORTED_MODULE_4___default()(styles_toastContainer,isMobile&&styles_mobile,isError?styles_error:styles_success);return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{className:style},onClose&&react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_index_cdf818b5_js__WEBPACK_IMPORTED_MODULE_0__[/* C */ "a"],{className:styles_close,onClick:onClose}),message)}var errorMap=((_errorMap={})[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].GENERIC]="UploadFile_Error_Generic_Toast",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].QUOTA_STORAGE_VISITOR]="UploadFile_Error_StorageExceeded_Visitor",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].QUOTA_STORAGE_OWNER]="UploadFile_Error_StorageExceeded_SiteOwner",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].QUOTA_VIDEO_VISITOR]="UploadVideo_Error_StorageExceeded_Visitor",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].QUOTA_VIDEO_OWNER]="UploadVideo_Error_StorageExceeded_SiteOwner",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].SIZE_LIMIT]="UploadFile_Error_Size_Toast",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].QUOTA_SINGLE_VIDEO_OWNER]="UploadVideo_Error_Video_Duration_SiteOwner",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].MIME_TYPE_MISMATCH]="UploadFile_Error_Mimetype_Mismatch",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].QUOTA_SINGLE_VIDEO_VISITOR]="UploadVideo_Error_Video_Duration_Visitor",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].WMP_ERROR_GENERAL]="UploadFile_Error_WMP_General",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].INVALID_SESSION]="UploadFile_Error_General_Logged_Out",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].SESSION_EXPIRED]="UploadFile_Error_General_Logged_Out",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].MISSING_WIX_SESSION]="UploadFile_Error_General_Logged_Out",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].INCORRECT_FILE_INFO]="UploadFile_Error_Corrupt_File",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].CORRUPT_FILE]="UploadFile_Error_Corrupt_File",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].UNSUPPORTED_EXTENSION]="UploadFile_Error_Unsupported_Extension",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].MISSING_HEADER]="UploadFile_Error_Corrupt_File",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].FORMAT_CHUNK_MISSING]="UploadFile_Error_Corrupt_File",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].EXT_FILE_AUTHORIZATION]="UploadFile_Error_External_File_Authorizaion",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].EXT_FILE_FORBBIDEN]="UploadFile_Error_External_File_Authorizaion",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].IMAGE_FORMAT]="UploadImage_Error_Unsupported_Image_Format",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].CORRUPT_IMAGE]="UploadImage_Error_Corrupted_Image",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].IMAGE_DIMENSIONS_EXCEEDED]="UploadImage_Error_Image_Dimensions_Exceeded",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].MP4_STEREO_FORMAT]="UploadAudio_Error_Unsupported_Stereo_Format",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].WAV_STEREO_FORMAT]="UploadAudio_Error_Unsupported_Stereo_Format",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].WMA_BITRATE]="UploadAudio_Error_Unsupported_Bit_Rate",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].WMA_BITRATE_LOSSY]="UploadAudio_Error_Unsupported_Bit_Rate",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].MP4_BITRATE]="UploadAudio_Error_Unsupported_Bit_Rate",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].MP3_UNSUPPORTED_STEREO]="UploadAudio_Error_MP3_Unsupported_Stereo_Format",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].MP3_UNSUPPORTED_FORMAT]="UploadAudio_Error_MP3_Unsupported_Format",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].WAV_SAMPLE_RATE]="UploadAudio_Error_Unsupported_Sample_Rate",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].AAC_UNSUPPORTED_FORMAT]="UploadAudio_Error_aac_Unsupported_Format",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].WAV_UNSUPPORTED_FORMAT]="UploadAudio_Error_wav_Unsupported_Format",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].WAV_SAMPLE_SIZE]="UploadAudio_Error_Unsupported_Sample_Size",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].WAV_CHUNK_SIZE]="UploadFile_Error_Corrupt_File",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].AUDIO_CODEC]="UploadAudio_Error_Unsupported_Audio_Codec",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].EMPTY_FILE]="UploadFile_Error_Empty_File",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].MP4_UNSUPPORTED_FORMAT]="UploadAudio_Error_MP4_Unsupported_Format",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].MP4_SAMPLE_RATE]="UploadVideo_Error_Unsupported_Sample_Rate",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].VIDEO_BITRATE]="UploadVideo_Error_Unsupported_Bit_Rate",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].VIDEO_DURATION_MISMATCH]="UploadVideo_Error_Video_Audio_Duration_Mismatch",_errorMap[wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__[/* MediaUploadErrorKey */ "C"].VIDEO_CODEC]="UploadVideo_Error_Unsupported_Video_Codec",_errorMap);/* harmony default export */ __webpack_exports__["default"] = (function(props){var _error$args,error=props.error,errorCount=props.errorCount,rest=Object(_index_cdf818b5_js__WEBPACK_IMPORTED_MODULE_0__[/* _ */ "d"])(props,["error","errorCount"]),translationKey=errorCount>1?"UploadFile_Error_Generic_Toast_Multiple":errorMap[error.key],upgradeUrl=null===(_error$args=error.args)||void 0===_error$args?void 0:_error$args.upgradeUrl,errorMsg=translationKey?react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_14__[/* Trans */ "b"],{i18nKey:translationKey,values:Object(_index_cdf818b5_js__WEBPACK_IMPORTED_MODULE_0__[/* f */ "e"])({},error.args,{errors:errorCount})},error.msg,upgradeUrl&&react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a",{href:upgradeUrl,target:"_blank",rel:"noreferrer"}," ")):error.msg;return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Toast,Object(_index_cdf818b5_js__WEBPACK_IMPORTED_MODULE_0__[/* f */ "e"])({message:errorMsg,isError:!0},rest))});
//# sourceMappingURL=ErrorMessage-1cc01fff.js.map


/***/ })

};;