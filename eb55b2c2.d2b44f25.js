(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{105:function(e,n,a){"use strict";a.r(n),a.d(n,"frontMatter",(function(){return r})),a.d(n,"metadata",(function(){return o})),a.d(n,"rightToc",(function(){return d})),a.d(n,"default",(function(){return b}));var i=a(3),t=a(7),l=(a(0),a(126)),r={id:"MediaPlugins",title:"Media Plugins Upload",sidebar_label:"Media Plugins"},o={unversionedId:"plugins_api/MediaPlugins",id:"plugins_api/MediaPlugins",isDocsHomePage:!1,title:"Media Plugins Upload",description:"In this section we'll further drill into media upload and error handling in Ricos.",source:"@site/docs/plugins_api/MediaPlugins.mdx",slug:"/plugins_api/MediaPlugins",permalink:"/rich-content/docs/plugins_api/MediaPlugins",version:"current",sidebar_label:"Media Plugins",sidebar:"api",previous:{title:"File Upload Plugin",permalink:"/rich-content/docs/plugins_api/FileUploadPlugin"},next:{title:"Emoji Plugin",permalink:"/rich-content/docs/plugins_api/EmojiPlugin"}},d=[{value:"Upload Functions API",id:"upload-functions-api",children:[]},{value:"Media Plugins <code>data</code> schemes",id:"media-plugins-data-schemes",children:[{value:"Image and Gallery",id:"image-and-gallery",children:[]},{value:"Video",id:"video",children:[]},{value:"File Upload",id:"file-upload",children:[]}]},{value:"Errors",id:"errors",children:[]}],s={rightToc:d};function b(e){var n=e.components,a=Object(t.a)(e,["components"]);return Object(l.b)("wrapper",Object(i.a)({},s,a,{components:n,mdxType:"MDXLayout"}),Object(l.b)("p",null,"In this section we'll further drill into media upload and error handling in Ricos."),Object(l.b)("h2",{id:"upload-functions-api"},"Upload Functions API"),Object(l.b)("p",null,"This functions should be passed to the media plugins via config \\ helpers (i.e image, gallery, video and file upload)."),Object(l.b)("pre",null,Object(l.b)("code",Object(i.a)({parentName:"pre"},{className:"language-jsx"}),"handleFileUpload: (files: File[], updateEntity: UpdateEntityFunction) => void\nhandleFileSelection: (updateEntity: UpdateEntityFunction) => void\n")),Object(l.b)("p",null,Object(l.b)("inlineCode",{parentName:"p"},"handleFileUpload")," is a function provided to handle media uploads from the native file input. ",Object(l.b)("br",null),"\n",Object(l.b)("inlineCode",{parentName:"p"},"handleFileSelection")," is a function provided to handle media uploads from a custom file input."),Object(l.b)("p",null,"In both functions when the upload phase is done the ",Object(l.b)("inlineCode",{parentName:"p"},"updateEntity")," callback should be called with an object containing the data, error (upon faliure) and index (for multiple file uploads)."),Object(l.b)("pre",null,Object(l.b)("code",Object(i.a)({parentName:"pre"},{className:"language-jsx"}),"UpdateEntityFunction<T>: ({ data: T, error: MediaUploadError, index: number }) => void\n")),Object(l.b)("h2",{id:"media-plugins-data-schemes"},"Media Plugins ",Object(l.b)("inlineCode",{parentName:"h2"},"data")," schemes"),Object(l.b)("h3",{id:"image-and-gallery"},"Image and Gallery"),Object(l.b)("pre",null,Object(l.b)("code",Object(i.a)({parentName:"pre"},{className:"language-jsx"}),"data?: {\n  id: string,\n  original_file_name: string,\n  file_name: string,\n  width: number,\n  height: number,\n}\n")),Object(l.b)("h3",{id:"video"},"Video"),Object(l.b)("pre",null,Object(l.b)("code",Object(i.a)({parentName:"pre"},{className:"language-jsx"}),"data?: {\n  pathname: string,\n  thumbnail: {\n    pathname: string,\n    height: number,\n    width: number,\n  },\n}\n")),Object(l.b)("h3",{id:"file-upload"},"File Upload"),Object(l.b)("pre",null,Object(l.b)("code",Object(i.a)({parentName:"pre"},{className:"language-jsx"}),"data?: {\n  name: string;\n  type: string;\n  url?: string;\n  id?: string;\n}\n")),Object(l.b)("h2",{id:"errors"},"Errors"),Object(l.b)("p",null,"In order to take advantage of Ricos stunning error toasts and general error handling a proper ",Object(l.b)("inlineCode",{parentName:"p"},"error")," object of type ",Object(l.b)("inlineCode",{parentName:"p"},"MediaUploadError")," should be passed. ",Object(l.b)("br",null),"\nPassing an error object triggers a toast indicating what caused the upload to fail as well as an indication of the error on the block. ",Object(l.b)("br",null),"\nUsing the ",Object(l.b)("inlineCode",{parentName:"p"},"getContent")," method of RicosEditor would also remove all blocks with errors from the content, thus they won't be seen on Viewer nor saved. ",Object(l.b)("br",null)),Object(l.b)("pre",null,Object(l.b)("code",Object(i.a)({parentName:"pre"},{className:"language-jsx"}),"MediaUploadError?: {\n  msg?: string | JSX.Element;\n  key?: MediaUploadErrorKey;\n  args?: Record<string, string | number>;\n}\n")),Object(l.b)("p",null,Object(l.b)("inlineCode",{parentName:"p"},"msg")," is a simple string or JSX Element to use for custom error messages to be displayed. ",Object(l.b)("br",null),"\n",Object(l.b)("inlineCode",{parentName:"p"},"key")," is an enum with our built in supported and localized error types. ",Object(l.b)("br",null),"\n",Object(l.b)("inlineCode",{parentName:"p"},"args")," are arguments needed for the built in toasts. ",Object(l.b)("br",null)),Object(l.b)("pre",null,Object(l.b)("code",Object(i.a)({parentName:"pre"},{className:"language-jsx"}),"enum MediaUploadErrorKey {\n  GENERIC,\n  SIZE_LIMIT,\n  QUOTA_STORAGE_VISITOR,\n  QUOTA_STORAGE_OWNER,\n  QUOTA_VIDEO_VISITOR,\n  QUOTA_VIDEO_OWNER,\n}\n")),Object(l.b)("p",null,Object(l.b)("inlineCode",{parentName:"p"},"GENERIC")," a general error with no specific reason ",Object(l.b)("br",null),"\n",Object(l.b)("inlineCode",{parentName:"p"},"SIZE_LIMIT")," the file is too big to upload, supports an argument ",Object(l.b)("inlineCode",{parentName:"p"},"maxLimit")," for maximum file size indication. ",Object(l.b)("br",null),"\n",Object(l.b)("inlineCode",{parentName:"p"},"QUOTA_STORAGE_VISITOR")," file storage exceeded the limit (UoU). ",Object(l.b)("br",null),"\n",Object(l.b)("inlineCode",{parentName:"p"},"QUOTA_STORAGE_OWNER")," file storage exceeded the limit (User), supports an argument ",Object(l.b)("inlineCode",{parentName:"p"},"upgradeUrl")," to upgrade the site's plan. ",Object(l.b)("br",null),"\n",Object(l.b)("inlineCode",{parentName:"p"},"QUOTA_VIDEO_VISITOR")," video hours on the site have reached the maximum (UoU). ",Object(l.b)("br",null),"\n",Object(l.b)("inlineCode",{parentName:"p"},"QUOTA_VIDEO_OWNER")," video hours on the site have reached the maximum (User), supports an argument ",Object(l.b)("inlineCode",{parentName:"p"},"upgradeUrl")," to upgrade the site's plan. ",Object(l.b)("br",null)))}b.isMDXComponent=!0}}]);