(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{261:function(e,t,a){e.exports=a(488)},268:function(e,t,a){},488:function(e,t,a){"use strict";a.r(t);var l=a(0),r=a.n(l),n=a(244),s=a.n(n),c=(a(268),a(69)),o=a(5);var i=function(){const e=Object(o.n)();return r.a.createElement("nav",{className:"bg-white shadow-md py-4 px-8 flex items-center"},r.a.createElement("div",{className:"text-2xl font-bold text-red-500 mr-auto"},"Healthai"),r.a.createElement("div",{className:"flex items-center space-x-6"},r.a.createElement(c.b,{to:"/about",className:`${"/about"===e.pathname?"text-red-500":"text-gray-700 hover:text-red-500"}`},"About"),r.a.createElement(c.b,{to:"/healthassistant",className:`${"/healthassistant"===e.pathname?"text-red-500":"text-gray-700 hover:text-red-500"}`},"Health Assistant"),r.a.createElement(c.b,{to:"/profile",className:`${"/profile"===e.pathname?"bg-red-600 text-white":"bg-red-500 text-white hover:bg-red-600"} py-2 px-4 rounded transition-colors`},"My Profile")))};var m=function(){return r.a.createElement("h1",{className:"text-2xl font-bold text-center mt-10"},"Home Page")};var d=function(){return r.a.createElement("div",{className:"max-w-4xl mx-auto px-4 py-8"},r.a.createElement("h1",{className:"text-3xl font-bold text-center mb-8"},"About Healthai Assistant"),r.a.createElement("div",{className:"bg-white rounded-lg shadow-lg p-6 mb-8"},r.a.createElement("h2",{className:"text-xl font-semibold mb-4"},"Getting Started"),r.a.createElement("p",{className:"text-gray-700 mb-4"},"To make the most of your Healthai experience, please log in or create an account. This allows us to save your profile information and track your progress over time."),r.a.createElement("div",{className:"bg-blue-50 border-l-4 border-blue-500 p-4 mb-4"},r.a.createElement("p",{className:"text-blue-700"},"\ud83d\udca1 Tip: Use Google Sign-In for a quick and seamless login experience!"))),r.a.createElement("div",{className:"bg-white rounded-lg shadow-lg p-6 mb-8"},r.a.createElement("h2",{className:"text-xl font-semibold mb-4"},"Key Features"),r.a.createElement("div",{className:"space-y-6"},r.a.createElement("div",null,r.a.createElement("h3",{className:"text-lg font-medium text-red-600 mb-2"},"Personalized Caloric Calculations"),r.a.createElement("p",{className:"text-gray-700"},"Using the scientifically-backed Mifflin-St Jeor Formula, we provide accurate daily caloric needs based on your profile and activity level. This helps create realistic and achievable nutrition goals.")),r.a.createElement("div",null,r.a.createElement("h3",{className:"text-lg font-medium text-red-600 mb-2"},"Custom Exercise Plans"),r.a.createElement("p",{className:"text-gray-700"},"Receive tailored workout recommendations based on your:"),r.a.createElement("ul",{className:"list-disc list-inside ml-4 mt-2 text-gray-700"},r.a.createElement("li",null,"Fitness goals"),r.a.createElement("li",null,"Available equipment"),r.a.createElement("li",null,"Time constraints"),r.a.createElement("li",null,"Current fitness level"))),r.a.createElement("div",null,r.a.createElement("h3",{className:"text-lg font-medium text-red-600 mb-2"},"Health & Wellness Guidance"),r.a.createElement("p",{className:"text-gray-700"},"Get evidence-based answers to your health-related questions, including nutrition advice, exercise techniques, and general wellness tips.")),r.a.createElement("div",null,r.a.createElement("h3",{className:"text-lg font-medium text-red-600 mb-2"},"Mental Health Support"),r.a.createElement("p",{className:"text-gray-700"},"Access supportive guidance for mental well-being, stress management, and maintaining a healthy work-life balance. Note: While we provide general support, please consult healthcare professionals for specific mental health concerns.")),r.a.createElement("div",null,r.a.createElement("h3",{className:"text-lg font-medium text-red-600 mb-2"},"Calendar Integration"),r.a.createElement("p",{className:"text-gray-700"},"Seamlessly schedule your workouts using Google Calendar integration. The assistant helps you find the perfect time slots based on your availability and preferences.")))),r.a.createElement("div",{className:"bg-white rounded-lg shadow-lg p-6"},r.a.createElement("h2",{className:"text-xl font-semibold mb-4"},"How to Use"),r.a.createElement("ol",{className:"list-decimal list-inside space-y-3 text-gray-700"},r.a.createElement("li",{className:"ml-4"},"Sign in or create an account to get started"),r.a.createElement("li",{className:"ml-4"},"Complete your profile with accurate information"),r.a.createElement("li",{className:"ml-4"},"Share your health and fitness goals with the assistant"),r.a.createElement("li",{className:"ml-4"},"Receive personalized recommendations and guidance"),r.a.createElement("li",{className:"ml-4"},"Use the chat interface to ask questions and get real-time advice"),r.a.createElement("li",{className:"ml-4"},"Schedule and track your workouts through calendar integration")),r.a.createElement("div",{className:"mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500"},r.a.createElement("p",{className:"text-yellow-700"},"\u26a0\ufe0f Important: Always consult with healthcare professionals before starting any new exercise or diet program, especially if you have pre-existing conditions."))))},u=a(35),g=a(16),p=a(245),h=a(259);const b={apiKey:"AIzaSyAXcR3T3b1n2Si60NpBbgQvvz7QF8HeEbE",authDomain:"healthai-780dc.firebaseapp.com",projectId:"healthai-780dc",storageBucket:"healthai-780dc.firebasestorage.app",messagingSenderId:"321626895600",appId:"1:321626895600:web:31a3adf86bab853d01be35",measurementId:"G-K14FSKC8GR"},f=Object(p.a)(b),E=Object(u.c)(f),x=Object(g.c)(f);Object(h.a)(f);console.log("Firebase config:",{hasApiKey:!!b.apiKey,hasAuthDomain:!!b.authDomain,hasProjectId:!!b.projectId,hasStorageBucket:!!b.storageBucket,hasMessagingSenderId:!!b.messagingSenderId,hasAppId:!!b.hasAppId,hasMeasurementId:!!b.hasMeasurementId});var v=a(491),y=a(493),w=a(492),N=a(257),S=a(258),k=a(53),j=a(71),O=a(256);var I=function(){const[e,t]=Object(l.useState)(!1),[a,n]=Object(l.useState)(!0),[s,c]=Object(l.useState)(""),[o,i]=Object(l.useState)(""),[m,d]=Object(l.useState)(""),[p,h]=Object(l.useState)(null),[b,f]=Object(l.useState)(!1),[I,C]=Object(l.useState)(!1),[A,H]=Object(l.useState)({age:"",sex:"",height:"",weight:"",activity:"",goals:""}),[M,D]=Object(l.useState)({weight:!0,bmi:!0}),[F,z]=Object(l.useState)("all");Object(l.useEffect)(()=>{console.log("Current Firebase Config:",{apiKey:"AIzaSyAXcR3T3b1n2Si60NpBbgQvvz7QF8HeEbE",authDomain:"healthai-780dc.firebaseapp.com",projectId:"healthai-780dc"});const e=Object(u.d)(E,async e=>{if(n(!0),e){t(!0);try{const t=await Object(g.b)(Object(g.a)(x,"users",e.uid));if(t.exists())h(t.data()),t.data().profile&&H({age:t.data().profile.age||"",sex:t.data().profile.sex||"",height:t.data().profile.height||"",weight:t.data().profile.weight||"",activity:t.data().profile.activity||"",goals:t.data().profile.goals||""});else{const t={profile:{email:e.email,name:e.displayName,photoURL:e.photoURL,createdAt:Object(g.d)()}};await Object(g.e)(Object(g.a)(x,"users",e.uid),t),h(t)}}catch(s){console.error("Error fetching user profile:",s),c("Error loading profile data")}}else t(!1),h(null);n(!1)});return()=>e()},[]);const P=async()=>{try{const e=new u.a;await Object(u.f)(E,e)}catch(s){c(s.message)}},L=async e=>{e.preventDefault(),c("");try{await Object(u.e)(E,o,m)}catch(s){c(s.message)}},B=async e=>{e.preventDefault(),c("");try{await Object(u.b)(E,o,m)}catch(s){c(s.message)}},R=e=>{if(!(null===e||void 0===e?void 0:e.sex)||!(null===e||void 0===e?void 0:e.weight)||!(null===e||void 0===e?void 0:e.height)||!(null===e||void 0===e?void 0:e.age))return null;const t=parseFloat(e.weight),a=parseFloat(e.height),l=parseFloat(e.age);return isNaN(t)||isNaN(a)||isNaN(l)?null:"male"===e.sex.toLowerCase()?10*t+6.25*a-5*l+5:10*t+6.25*a-5*l-161},$=e=>({sedentary:1.2,light:1.375,moderate:1.55,heavy:1.725,athlete:1.9})[e.toLowerCase()]||1.2;return a?r.a.createElement("div",{className:"flex justify-center items-center h-screen"},r.a.createElement("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"})):e?r.a.createElement("div",{className:"container mx-auto p-8"},r.a.createElement("div",{className:"flex justify-between items-center mb-6"},r.a.createElement("h1",{className:"text-4xl font-bold"},"My Profile"),r.a.createElement("div",{className:"flex gap-4"},!I&&r.a.createElement("button",{onClick:()=>C(!0),className:"bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"},"Edit Profile"),r.a.createElement("button",{onClick:async()=>{try{await Object(u.g)(E)}catch(s){c(s.message)}},className:"bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"},"Logout"))),s&&r.a.createElement("div",{className:"mb-6 p-4 bg-red-100 text-red-700 rounded-lg"},s),I?r.a.createElement("form",{onSubmit:async e=>{e.preventDefault();try{const e=Object(g.a)(x,"users",E.currentUser.uid),t=await Object(g.b)(e),a=t.exists()?t.data():{},l=(A.weight/Math.pow(A.height/100,2)).toFixed(1),r={weight:parseFloat(A.weight),bmi:parseFloat(l),date:(new Date).toISOString()},n=new Date,o={...a,profile:{...a.profile,...A,updatedAt:n.toISOString()},metricsHistory:[...a.metricsHistory||[],r]};await Object(g.e)(e,{...o,profile:{...o.profile,updatedAt:Object(g.d)()}}),h(o),C(!1),c("")}catch(s){console.error("Error updating profile:",s),c("Failed to update profile")}},className:"bg-white p-6 rounded-lg shadow-sm mb-6"},r.a.createElement("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6"},r.a.createElement("div",null,r.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2"},"Age"),r.a.createElement("input",{type:"number",value:A.age,onChange:e=>H(t=>({...t,age:e.target.value})),className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700",placeholder:"Enter age"})),r.a.createElement("div",null,r.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2"},"Sex"),r.a.createElement("select",{value:A.sex,onChange:e=>H(t=>({...t,sex:e.target.value})),className:"shadow border rounded w-full py-2 px-3 text-gray-700"},r.a.createElement("option",{value:""},"Select sex"),r.a.createElement("option",{value:"male"},"Male"),r.a.createElement("option",{value:"female"},"Female"))),r.a.createElement("div",null,r.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2"},"Height (cm)"),r.a.createElement("input",{type:"number",value:A.height,onChange:e=>H(t=>({...t,height:e.target.value})),className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700",placeholder:"Enter height in cm"})),r.a.createElement("div",null,r.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2"},"Weight (kg)"),r.a.createElement("input",{type:"number",value:A.weight,onChange:e=>H(t=>({...t,weight:e.target.value})),className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700",placeholder:"Enter weight in kg"})),r.a.createElement("div",null,r.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2"},"Activity Level"),r.a.createElement("select",{value:A.activity,onChange:e=>H(t=>({...t,activity:e.target.value})),className:"shadow border rounded w-full py-2 px-3 text-gray-700"},r.a.createElement("option",{value:""},"Select activity level"),r.a.createElement("option",{value:"sedentary"},"Sedentary"),r.a.createElement("option",{value:"light"},"Light"),r.a.createElement("option",{value:"moderate"},"Moderate"),r.a.createElement("option",{value:"heavy"},"Heavy"),r.a.createElement("option",{value:"athlete"},"Athlete"))),r.a.createElement("div",{className:"md:col-span-2"},r.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2"},"Health Goals"),r.a.createElement("textarea",{value:A.goals,onChange:e=>H(t=>({...t,goals:e.target.value})),className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700",placeholder:"Enter your health goals",rows:4}))),r.a.createElement("div",{className:"flex gap-4 mt-6"},r.a.createElement("button",{type:"submit",className:"bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"},"Save Changes"),r.a.createElement("button",{type:"button",onClick:()=>C(!1),className:"bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"},"Cancel"))):(null===p||void 0===p?void 0:p.profile)?r.a.createElement("div",{className:"bg-white p-6 rounded-lg shadow-sm mb-6"},r.a.createElement("div",{className:"flex justify-between items-center mb-4"},r.a.createElement("h2",{className:"text-xl font-semibold"},"Profile Information"),r.a.createElement("span",{className:"text-sm text-gray-500"},p.profile.updatedAt?`Last updated: ${new Date(p.profile.updatedAt).toLocaleDateString()}`:"")),r.a.createElement("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"},r.a.createElement("div",{className:"bg-gray-50 p-4 rounded-lg"},r.a.createElement("h3",{className:"font-medium text-gray-800 mb-3"},"Basic Information"),r.a.createElement("div",{className:"space-y-2"},p.profile.name&&r.a.createElement("div",{className:"flex justify-between"},r.a.createElement("span",{className:"text-gray-600"},"Name:"),r.a.createElement("span",{className:"font-medium"},p.profile.name)),r.a.createElement("div",{className:"flex justify-between"},r.a.createElement("span",{className:"text-gray-600"},"Email:"),r.a.createElement("span",{className:"font-medium"},p.profile.email)),p.profile.age&&r.a.createElement("div",{className:"flex justify-between"},r.a.createElement("span",{className:"text-gray-600"},"Age:"),r.a.createElement("span",{className:"font-medium"},p.profile.age)),p.profile.sex&&r.a.createElement("div",{className:"flex justify-between"},r.a.createElement("span",{className:"text-gray-600"},"Sex:"),r.a.createElement("span",{className:"font-medium"},p.profile.sex)))),r.a.createElement("div",{className:"bg-gray-50 p-4 rounded-lg"},r.a.createElement("h3",{className:"font-medium text-gray-800 mb-3"},"Physical Metrics"),r.a.createElement("div",{className:"space-y-2"},p.profile.height&&r.a.createElement("div",{className:"flex justify-between"},r.a.createElement("span",{className:"text-gray-600"},"Height:"),r.a.createElement("span",{className:"font-medium"},p.profile.height," cm")),p.profile.weight&&r.a.createElement("div",{className:"flex justify-between"},r.a.createElement("span",{className:"text-gray-600"},"Weight:"),r.a.createElement("span",{className:"font-medium"},p.profile.weight," kg")),p.profile.height&&p.profile.weight&&r.a.createElement("div",{className:"flex justify-between"},r.a.createElement("span",{className:"text-gray-600"},"BMI:"),r.a.createElement("span",{className:"font-medium"},(p.profile.weight/Math.pow(p.profile.height/100,2)).toFixed(1))))),r.a.createElement("div",{className:"bg-gray-50 p-4 rounded-lg"},r.a.createElement("h3",{className:"font-medium text-gray-800 mb-3"},"Fitness Information"),r.a.createElement("div",{className:"space-y-2"},p.profile.activity&&r.a.createElement("div",{className:"flex justify-between"},r.a.createElement("span",{className:"text-gray-600"},"Activity Level:"),r.a.createElement("span",{className:"font-medium"},p.profile.activity))))),p.profile.goals&&r.a.createElement("div",{className:"mt-6 bg-gray-50 p-4 rounded-lg"},r.a.createElement("h3",{className:"font-medium text-gray-800 mb-3"},"Health Goals"),r.a.createElement("p",{className:"text-gray-700"},p.profile.goals)),p.profile.weight&&p.profile.height&&p.profile.age&&p.profile.sex&&r.a.createElement("div",{className:"mt-6 bg-blue-50 p-4 rounded-lg"},r.a.createElement("h3",{className:"font-medium text-blue-800 mb-3"},"Daily Caloric Needs"),r.a.createElement("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4"},r.a.createElement("div",{className:"text-center p-4 bg-white rounded-lg shadow-sm"},r.a.createElement("div",{className:"text-sm text-blue-600"},"Basal Metabolic Rate (BMR)"),r.a.createElement("div",{className:"font-bold text-lg"},Math.round(R(p.profile))," kcal"),r.a.createElement("div",{className:"text-xs text-gray-500 mt-1"},"Calories burned at complete rest")),r.a.createElement("div",{className:"text-center p-4 bg-white rounded-lg shadow-sm"},r.a.createElement("div",{className:"text-sm text-blue-600"},"Maintenance Calories"),r.a.createElement("div",{className:"font-bold text-lg"},Math.round(R(p.profile)*$(p.profile.activity))," kcal"),r.a.createElement("div",{className:"text-xs text-gray-500 mt-1"},"Daily calories to maintain weight")),r.a.createElement("div",{className:"text-center p-4 bg-white rounded-lg shadow-sm"},r.a.createElement("div",{className:"text-sm text-blue-600"},"Weight Loss Target"),r.a.createElement("div",{className:"font-bold text-lg"},Math.round(R(p.profile)*$(p.profile.activity)-500)," kcal"),r.a.createElement("div",{className:"text-xs text-gray-500 mt-1"},"500 calorie deficit for weight loss")))),(null===p||void 0===p?void 0:p.metricsHistory)?r.a.createElement("div",{className:"mt-6 bg-white p-4 rounded-lg shadow-sm"},r.a.createElement("div",{className:"flex justify-between items-center mb-4"},r.a.createElement("h3",{className:"font-medium text-blue-800"},"Progress Tracking"),r.a.createElement("div",{className:"flex gap-4"},r.a.createElement("div",{className:"flex items-center gap-2"},r.a.createElement("label",{className:"text-sm text-gray-600"},"Show:"),r.a.createElement("div",{className:"flex gap-2"},r.a.createElement("label",{className:"inline-flex items-center"},r.a.createElement("input",{type:"checkbox",checked:M.weight,onChange:()=>D(e=>({...e,weight:!e.weight})),className:"form-checkbox h-4 w-4 text-blue-600"}),r.a.createElement("span",{className:"ml-2 text-sm"},"Weight")),r.a.createElement("label",{className:"inline-flex items-center"},r.a.createElement("input",{type:"checkbox",checked:M.bmi,onChange:()=>D(e=>({...e,bmi:!e.bmi})),className:"form-checkbox h-4 w-4 text-blue-600"}),r.a.createElement("span",{className:"ml-2 text-sm"},"BMI")))),r.a.createElement("select",{value:F,onChange:e=>z(e.target.value),className:"text-sm border rounded px-2 py-1"},r.a.createElement("option",{value:"week"},"Last Week"),r.a.createElement("option",{value:"month"},"Last Month"),r.a.createElement("option",{value:"year"},"Last Year"),r.a.createElement("option",{value:"all"},"All Time")))),r.a.createElement("div",{className:"h-[400px] w-full"},r.a.createElement(v.a,{width:"100%",height:"100%"},r.a.createElement(y.a,{data:(e=>{if(!e)return[];const t=new Date;return e.filter(e=>{const a=new Date(e.date);switch(F){case"week":return t-a<=6048e5;case"month":return t-a<=2592e6;case"year":return t-a<=31536e6;default:return!0}})})(p.metricsHistory),margin:{top:5,right:30,left:20,bottom:5}},r.a.createElement(w.a,{strokeDasharray:"3 3"}),r.a.createElement(N.a,{dataKey:"date",tickFormatter:e=>new Date(e).toLocaleDateString()}),r.a.createElement(S.a,{yAxisId:"weight",orientation:"left",stroke:"#2563eb",domain:["auto","auto"]}),r.a.createElement(S.a,{yAxisId:"bmi",orientation:"right",stroke:"#dc2626",domain:[15,35]}),r.a.createElement(k.a,{labelFormatter:e=>new Date(e).toLocaleDateString(),formatter:(e,t)=>[e.toFixed(1),t]}),r.a.createElement(j.a,null),M.weight&&r.a.createElement(O.a,{yAxisId:"weight",type:"monotone",dataKey:"weight",stroke:"#2563eb",name:"Weight (kg)",dot:!0,connectNulls:!0}),M.bmi&&r.a.createElement(O.a,{yAxisId:"bmi",type:"monotone",dataKey:"bmi",stroke:"#dc2626",name:"BMI",dot:!0,connectNulls:!0})))),r.a.createElement("div",{className:"mt-4 p-4 bg-gray-50 rounded-lg"},r.a.createElement("h4",{className:"text-sm font-medium text-gray-700 mb-2"},"BMI Reference Scale:"),r.a.createElement("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-2"},r.a.createElement("div",{className:"text-xs"},r.a.createElement("span",{className:"font-medium"},"Underweight:")," < 18.5"),r.a.createElement("div",{className:"text-xs"},r.a.createElement("span",{className:"font-medium"},"Normal:")," 18.5 - 24.9"),r.a.createElement("div",{className:"text-xs"},r.a.createElement("span",{className:"font-medium"},"Overweight:")," 25 - 29.9"),r.a.createElement("div",{className:"text-xs"},r.a.createElement("span",{className:"font-medium"},"Obese:")," \u2265 30")))):r.a.createElement("div",{className:"mt-6 bg-gray-50 p-4 rounded-lg"},r.a.createElement("p",{className:"text-sm text-gray-600"},"No progress data available yet. Update your profile to start tracking your progress."))):r.a.createElement("div",{className:"bg-yellow-50 border-l-4 border-yellow-400 p-4"},r.a.createElement("div",{className:"flex"},r.a.createElement("div",{className:"flex-shrink-0"},r.a.createElement("svg",{className:"h-5 w-5 text-yellow-400",viewBox:"0 0 20 20",fill:"currentColor"},r.a.createElement("path",{fillRule:"evenodd",d:"M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",clipRule:"evenodd"}))),r.a.createElement("div",{className:"ml-3"},r.a.createElement("p",{className:"text-sm text-yellow-700"},"Your profile is not complete. Click 'Edit Profile' to add your information."))))):r.a.createElement("div",{className:"flex flex-col items-center mt-10"},r.a.createElement("h2",{className:"text-2xl font-bold mb-4"},b?"Register":"Login"),s&&r.a.createElement("div",{className:"mb-4 p-3 bg-red-100 text-red-700 rounded-lg"},s),r.a.createElement("form",{className:"w-1/2 max-w-xs",onSubmit:b?B:L},r.a.createElement("div",{className:"mb-4"},r.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2"},"Email"),r.a.createElement("input",{type:"email",value:o,onChange:e=>i(e.target.value),className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",placeholder:"Enter email",required:!0})),r.a.createElement("div",{className:"mb-6"},r.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2"},"Password"),r.a.createElement("input",{type:"password",value:m,onChange:e=>d(e.target.value),className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",placeholder:"Enter password",required:!0})),r.a.createElement("div",{className:"flex flex-col gap-2"},r.a.createElement("button",{type:"submit",className:"bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full"},b?"Register":"Login"),r.a.createElement("button",{type:"button",onClick:P,className:"flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"},r.a.createElement("svg",{className:"w-5 h-5",viewBox:"0 0 24 24"},r.a.createElement("path",{fill:"#4285F4",d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"}),r.a.createElement("path",{fill:"#34A853",d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"}),r.a.createElement("path",{fill:"#FBBC05",d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"}),r.a.createElement("path",{fill:"#EA4335",d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"})),"Continue with Google"),r.a.createElement("div",{className:"text-center text-gray-500 text-sm my-2"},"OR"),r.a.createElement("button",{type:"button",onClick:()=>f(!b),className:"text-red-500 hover:text-red-600 text-sm"},b?"Already have an account? Login":"Don't have an account? Register"))))};const C="Hi! I'm your personal health assistant. To help you better, I'd like to know a few things about you:\n1. Your age\n2. Your sex (male/female)\n3. Your height (in cm)\n4. Your weight (in kg)\n5. Your physical activity level (sedentary/light/moderate/heavy/athlete)\n6. Your health goals\n\nPlease provide these details so I can give you personalized advice.",A="Welcome back! How may I help you today? If you need to update your profile information, just say 'update profile' and I'll help you with that.";var H=function(){const[e,t]=Object(l.useState)([]),[a,n]=Object(l.useState)(""),[s,c]=Object(l.useState)(!1),[o,i]=Object(l.useState)(null),[m,d]=Object(l.useState)(null),[p,h]=Object(l.useState)(!1),b=Object(l.useRef)(null);Object(l.useEffect)(()=>{const e=Object(u.d)(E,async e=>{e?(d(e.uid),await v(e.uid)):(d(null),i(null),t([{role:"assistant",content:C}]))});return()=>e()},[]),Object(l.useEffect)(()=>{b.current&&(b.current.scrollTop=b.current.scrollHeight)},[e]);const f=e=>!!e&&["age","sex","height","weight","activity","goals"].every(t=>e[t]),v=async e=>{try{const l=await Object(g.b)(Object(g.a)(x,"users",e));if(l.exists()){const e=l.data();if(i(e.profile),e.chatHistory&&e.chatHistory.length>0){const a=e.chatHistory.map(e=>({role:e.role,content:e.content,timestamp:e.timestamp}));t(a)}else t([{role:"assistant",content:f(e.profile)?A:C,timestamp:(new Date).toISOString()}])}else await Object(g.e)(Object(g.a)(x,"users",e),{createdAt:Object(g.d)(),chatHistory:[{role:"assistant",content:C,timestamp:(new Date).toISOString()}]}),t([{role:"assistant",content:C,timestamp:(new Date).toISOString()}])}catch(a){console.error("Error loading user profile:",a),t([{role:"assistant",content:"Error loading profile. Please try again.",timestamp:(new Date).toISOString()}])}},y=async e=>{if(m)try{const a=Object(g.a)(x,"users",m),l=e.slice(-50).map(e=>({role:e.role,content:e.content,timestamp:(new Date).toISOString()}));await Object(g.f)(a,{chatHistory:l,lastInteraction:(new Date).toISOString()})}catch(t){console.error("Error saving chat history:",t)}},w=async()=>{if(!a.trim())return;const l={role:"user",content:a,timestamp:(new Date).toISOString()},r=[...e,l];t(r),n(""),c(!0);try{if(m){if(a.toLowerCase().includes("update profile")){h(!0);const e={role:"assistant",content:C,timestamp:(new Date).toISOString()},a=[...r,e];return t(a),await y(a),void c(!1)}if(p||!o){const e=(e=>{const t={age:/\b\d{1,2}\b/,sex:/\b(male|female)\b/i,height:/\b\d{2,3}\b(?=\s*cm)/,weight:/\b\d{2,3}\b(?=\s*kg)/,activity:/\b(sedentary|light|moderate|heavy|athlete)\b/i},a={};console.log("Processing message:",e);for(const[r,n]of Object.entries(t)){const t=e.toLowerCase().match(n);t&&(a[r]="sex"===r?t[0].toLowerCase():t[0],console.log(`Matched ${r}:`,a[r]))}const l=e.match(/goals:\s*(.+?)(?=\n|$)/i)||e.match(/6\.\s*(.+?)(?=\n|$)/);return l&&(a.goals=l[1].trim(),console.log("Matched goals:",a.goals)),console.log("Processed profile:",a),Object.keys(a).length>=3?a:null})(a);if(e){await(async e=>{if(m)try{const a=Object(g.a)(x,"users",m),l=await Object(g.b)(a),r=l.exists()?l.data():{},n={...r,profile:{...r.profile||{},...e,updatedAt:(new Date).toISOString()}};return await Object(g.e)(a,n,{merge:!0}),n}catch(t){throw console.error("Error saving user profile:",t),t}})(e),i(e),h(!1);const a={role:"assistant",content:"Profile updated successfully! How may I help you today?",timestamp:(new Date).toISOString()},l=[...r,a];return t(l),await y(l),void c(!1)}}}const e=[{role:"system",content:`You are a helpful health assistant. ${m&&o?`User profile: Age: ${o.age}, Sex: ${o.sex}, Height: ${o.height}cm, Weight: ${o.weight}kg, Activity: ${o.activity}\nGoals: ${o.goals}`:"No profile information available. Provide general health advice and inform user they can save their profile by logging in."}\n          \n          Key responsibilities:\n          1. ${m?"If user profile is not set, focus on collecting missing profile information":"Provide general health advice"}\n          2. ${m?"Once profile is set, provide personalized health advice":"Recommend logging in for personalized advice"}\n          3. Use Mifflin-St Jeor Formula for caloric calculations when relevant\n          4. Focus on evidence-based recommendations\n          5. Be encouraging and supportive\n          6. For mental health questions, provide general guidance and recommend professional help when appropriate\n          7. ${m?"If user asks to update profile, guide them through the update process":"If user asks about profile features, inform them they need to log in"}\n          \n          Always maintain a professional yet friendly tone.`},...r],l=await(async e=>{try{const a="https://healthai-tan2.onrender.com",l=await fetch(`${a}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:e}),credentials:"omit"});if(!l.ok)throw new Error("Failed to get response from OpenAI");return(await l.json()).message}catch(t){throw console.error("Error calling OpenAI:",t),t}})(e),n=[...r,{role:"assistant",content:l,timestamp:(new Date).toISOString()}];t(n),m&&await y(n)}catch(s){console.error("Error in chat interaction:",s),t(e=>[...e,{role:"assistant",content:"I apologize, but I encountered an error. Please try again.",timestamp:(new Date).toISOString()}])}c(!1)};return r.a.createElement("div",{className:"w-[85%] mx-auto px-4 py-4"},r.a.createElement("h1",{className:"text-2xl font-bold text-center mb-6"},"Health Assistant"),!m&&r.a.createElement("div",{className:"bg-blue-50 border-l-4 border-blue-500 p-4 mb-4"},r.a.createElement("div",{className:"flex"},r.a.createElement("div",{className:"flex-shrink-0"},r.a.createElement("svg",{className:"h-5 w-5 text-blue-400",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},r.a.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",clipRule:"evenodd"}))),r.a.createElement("div",{className:"ml-3"},r.a.createElement("p",{className:"text-sm text-blue-700"},"You're using the chat assistant in guest mode. To save your chat history and get personalized recommendations, please log in or create an account.")))),o&&r.a.createElement("div",{className:"bg-white rounded-lg p-4 mb-4 shadow-sm"},r.a.createElement("div",{className:"flex justify-between items-center"},r.a.createElement("h2",{className:"text-lg font-semibold mb-2"},"Your Profile"),r.a.createElement("button",{onClick:()=>h(!0),className:"text-sm text-blue-500 hover:text-blue-700"},"Update Profile")),r.a.createElement("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-4 text-sm"},r.a.createElement("div",null,r.a.createElement("span",{className:"font-medium"},"Age:")," ",o.age),r.a.createElement("div",null,r.a.createElement("span",{className:"font-medium"},"Sex:")," ",o.sex),r.a.createElement("div",null,r.a.createElement("span",{className:"font-medium"},"Height:")," ",o.height,"cm"),r.a.createElement("div",null,r.a.createElement("span",{className:"font-medium"},"Weight:")," ",o.weight,"kg"),r.a.createElement("div",null,r.a.createElement("span",{className:"font-medium"},"Activity Level:")," ",o.activity)),r.a.createElement("div",{className:"mt-2"},r.a.createElement("span",{className:"font-medium"},"Goals:"),r.a.createElement("p",{className:"text-sm mt-1"},o.goals))),r.a.createElement("div",{className:"w-full mx-auto bg-gray-100 rounded-lg shadow-lg"},r.a.createElement("div",{className:"p-8"},r.a.createElement("div",{ref:b,className:"bg-white rounded-lg p-6 h-[600px] overflow-y-auto mb-6 shadow-inner"},e.map((e,t)=>r.a.createElement("div",{key:t,className:`flex ${"user"===e.role?"justify-end":"justify-start"} mb-4`},r.a.createElement("div",{className:"flex items-start max-w-[80%]"},"assistant"===e.role&&r.a.createElement("div",{className:"w-8 h-8 rounded-full bg-gray-200 mr-2 flex-shrink-0"}),r.a.createElement("div",{className:`rounded-lg p-3 ${"user"===e.role?"bg-blue-500 text-white":"bg-gray-200"}`},(e=>r.a.createElement("div",{className:"whitespace-pre-wrap"},e.split("\n").map((e,t)=>r.a.createElement("div",{key:t,className:"mb-2"},e))))(e.content)),"user"===e.role&&r.a.createElement("div",{className:"w-8 h-8 rounded-full bg-gray-200 ml-2 flex-shrink-0"})))),s&&r.a.createElement("div",{className:"flex justify-start mb-4"},r.a.createElement("div",{className:"flex items-center bg-gray-200 rounded-lg p-3"},r.a.createElement("svg",{className:"animate-spin h-4 w-4 text-gray-500",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},r.a.createElement("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),r.a.createElement("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"}))))),r.a.createElement("div",{className:"flex gap-3"},r.a.createElement("input",{type:"text",value:a,onChange:e=>n(e.target.value),onKeyPress:e=>"Enter"===e.key&&w(),placeholder:"Type your message...",className:"flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"}),r.a.createElement("button",{onClick:w,className:"px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors",disabled:s},s?r.a.createElement("div",{className:"flex items-center"},r.a.createElement("svg",{className:"animate-spin -ml-1 mr-3 h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},r.a.createElement("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),r.a.createElement("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})),"Sending..."):"Send")))),p&&r.a.createElement("div",{className:"fixed bottom-4 right-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded shadow-lg"},r.a.createElement("div",{className:"flex"},r.a.createElement("div",{className:"flex-shrink-0"},r.a.createElement("svg",{className:"h-5 w-5 text-blue-500",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},r.a.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",clipRule:"evenodd"}))),r.a.createElement("div",{className:"ml-3"},r.a.createElement("p",{className:"text-sm"},"Profile update mode active. Please provide your updated information.")))))};var M=function(){return r.a.createElement(c.a,null,r.a.createElement("div",{className:"min-h-screen bg-gray-50"},r.a.createElement(i,null),r.a.createElement(o.d,null,r.a.createElement(o.b,{path:"/",element:r.a.createElement(o.a,{to:"/profile",replace:!0})}),r.a.createElement(o.b,{path:"/home",element:r.a.createElement(m,null)}),r.a.createElement(o.b,{path:"/about",element:r.a.createElement(d,null)}),r.a.createElement(o.b,{path:"/profile",element:r.a.createElement(I,null)}),r.a.createElement(o.b,{path:"/healthassistant",element:r.a.createElement(H,null)}))))};var D=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,494)).then(t=>{let{getCLS:a,getFID:l,getFCP:r,getLCP:n,getTTFB:s}=t;a(e),l(e),r(e),n(e),s(e)})};s.a.createRoot(document.getElementById("root")).render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(M,null))),D()}},[[261,1,2]]]);