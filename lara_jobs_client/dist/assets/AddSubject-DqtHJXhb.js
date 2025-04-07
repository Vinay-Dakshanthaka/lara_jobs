import{r,j as e,e as C,f as $,b as n,c as i,V as o}from"./index-Buvrw9V4.js";const se=()=>{const[u,j]=r.useState(""),[m,f]=r.useState(""),[A,y]=r.useState(!1),[D,w]=r.useState(!1),[h,x]=r.useState(!1),[N,k]=r.useState(null),[I,_]=r.useState(null),[b,S]=r.useState(""),[M,z]=r.useState([]),[B,F]=r.useState(null),[q,g]=r.useState(!1),[P,p]=r.useState(!1),[v,R]=r.useState(null),U=()=>{x(!1),y(!0)},X=async t=>{try{console.log("Inside handle edit subject");const s=localStorage.getItem("token");if(!s)throw new Error("No token provided.");const a={headers:{Authorization:`Bearer ${s}`}},c=await n.get(`${i}/api/placement-test/subject/getSubjectById/${t}`,a);j(c.data.data.name),k(t),x(!0),y(!0)}catch(s){console.error("Error fetching subject:",s)}},L=async t=>{try{console.log("Inside handle edit topic");const s=localStorage.getItem("token");if(!s)throw new Error("No token provided.");const a={headers:{Authorization:`Bearer ${s}`}},c=await n.get(`${i}/api/placement-test/topic/${t}`,a);f(c.data.data.name),_(t),x(!0),w(!0)}catch(s){console.error("Error fetching topic:",s)}},O=async t=>{F(t),g(!0)},V=async t=>{R(t),p(!0)},J=async()=>{try{const t=localStorage.getItem("token");if(!t)throw new Error("No token provided.");const s={headers:{Authorization:`Bearer ${t}`}};await n.delete(`${i}/api/placement-test/subject/${B}`,s),o.success("Subject Deleted Successfully!!"),d(),g(!1)}catch(t){console.error("Error deleting subject:",t),o.error("Something went wrong!!!")}},Y=async()=>{try{const t=localStorage.getItem("token");if(!t)throw new Error("No token provided.");const s={headers:{Authorization:`Bearer ${t}`}};console.log("topic id to delte ",v),await n.delete(`${i}/api/placement-test/topic/delete/${v}`,s),o.success("Topic Deleted Successfully!!"),d(),p(!1)}catch(t){console.error("Error deleting topic:",t),o.error("Something went wrong!!!")}},G=t=>{k(t),x(!1),w(!0)},l=()=>{y(!1),w(!1),p(!1),g(!1),S(""),j(""),f("")},H=async t=>{if(console.log("Inside handle handle SubjectSubmit"),t.preventDefault(),!u.trim()){S("Subject name is required");return}try{const s=localStorage.getItem("token");if(!s)throw new Error("No token provided.");const a={headers:{Authorization:`Bearer ${s}`}};if(h){const c=await n.put(`${i}/api/placement-test/subject/${N}`,{subject_name:u.trim()},a);o.success("Subject Updated")}else{const c=await n.post(`${i}/api/placement-test/subject/create`,{name:u},a);o.success("Subject Added")}d(),l()}catch(s){s.response&&(s.response&&s.response.data.code==="SUBJECT_ALREADY_EXISTS"?(o.error("Entered subject already exist"),l()):(console.error("Error:",s),l(),o.error("Something went wrong")))}},K=async t=>{if(console.log("Inside handle topic submit"),t.preventDefault(),!m.trim()){S("Topic name is required");return}try{const s=localStorage.getItem("token");if(!s)throw new Error("No token provided.");const a={headers:{Authorization:`Bearer ${s}`}};if(h){const c=await n.put(`${i}/api/placement-test/topic/updateTopic`,{topic_id:I,topic_name:m},a);o.success("Topic Updated")}else{console.log("current subject id ",N);const c=await n.post(`${i}/api/placement-test/topic/create`,{subjectId:N,topic_name:m.trim()},a);o.success("Topic Added")}d(),l()}catch(s){s.response&&(s.response&&s.response.data.code==="TOPIC_NAME_EXIST"?(o.error("Topic already exist for this subject"),l()):(console.error("Error:",s),l(),o.error("Something went wrong")))}},d=async()=>{try{console.log("Inside Fetch subjects");const t=await n.get(`${i}/api/placement-test/subject/subject-topics`);console.log("Fetched subjects : ",t),z(t.data.data),console.log("fetched subjects : ",t)}catch(t){console.error("Error fetching subjects:",t)}};r.useEffect(()=>{d()},[]);const[Q,ee]=r.useState(1),T=5,E=Q*T,W=E-T,Z=M.slice(W,E);return e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition",onClick:U,children:"Add Subject"}),e.jsx("hr",{className:"my-4 border-gray-300"}),e.jsxs("table",{className:"min-w-full table-auto bg-white dark:bg-gray-700 rounded-md shadow-md",children:[e.jsx("thead",{className:"bg-gray-100 dark:bg-gray-800",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-gray-100",children:"Subject Name"}),e.jsx("th",{className:"px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-gray-100",children:"Topics"}),e.jsx("th",{className:"px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-gray-100",children:"Add Topic"})]})}),e.jsx("tbody",{children:Z.map((t,s)=>e.jsxs("tr",{className:"border-b dark:border-gray-600",children:[e.jsx("td",{className:"px-4 py-2",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("span",{className:"text-gray-900 dark:text-gray-100",children:t.name}),e.jsxs("div",{className:"ml-2 space-x-2",children:[e.jsx("button",{className:"bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600",onClick:()=>X(t.subject_id),children:e.jsx(C,{className:"text-white size-4"})}),e.jsx("button",{className:"bg-red-500 text-white p-2 rounded-md hover:bg-red-600",onClick:()=>O(t.subject_id),children:e.jsx($,{className:"text-white size-4"})})]})]})}),e.jsx("td",{className:"px-4 py-2",children:e.jsx("ul",{children:t.topics.map((a,c)=>e.jsx("li",{className:"mb-2",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-gray-900 dark:text-gray-100",children:a.name}),e.jsxs("div",{className:"space-x-2",children:[e.jsx("button",{className:"bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600",onClick:()=>L(a.topic_id),children:e.jsx(C,{className:"text-white size-4"})}),e.jsx("button",{className:"bg-red-500 text-white p-2 rounded-md hover:bg-red-600",onClick:()=>V(a.topic_id),children:e.jsx($,{className:"text-white size-4"})})]})]})},c))})}),e.jsx("td",{className:"px-4 py-2",children:e.jsx("button",{className:"bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600",onClick:()=>G(t.subject_id),children:"Add Topic"})})]},s))})]}),e.jsx("div",{className:`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 ${A?"block":"hidden"}`,children:e.jsxs("div",{className:"bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 dark:text-gray-100",children:h?"Edit Subject":"Add Subject"}),e.jsx("button",{className:"text-gray-500 hover:text-gray-700",onClick:l,children:"X"})]}),e.jsxs("form",{onSubmit:H,children:[e.jsxs("div",{className:"mt-4",children:[e.jsx("label",{htmlFor:"subjectName",className:"block text-sm font-medium text-gray-900 dark:text-gray-100",children:"Subject Name"}),e.jsx("input",{type:"text",id:"subjectName",value:u,onChange:t=>j(t.target.value),className:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",isInvalid:!!b,required:!0}),e.jsx("p",{className:"text-red-500 text-xs mt-1",children:b})]}),e.jsx("button",{type:"submit",className:"mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600",children:"Submit"})]})]})}),e.jsx("div",{className:`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 ${D?"block":"hidden"}`,children:e.jsxs("div",{className:"bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 dark:text-gray-100",children:h?"Edit Topic":"Add Topic"}),e.jsx("button",{className:"text-gray-500 hover:text-gray-700",onClick:l,children:"X"})]}),e.jsxs("form",{onSubmit:K,children:[e.jsxs("div",{className:"mt-4",children:[e.jsx("label",{htmlFor:"topicName",className:"block text-sm font-medium text-gray-900 dark:text-gray-100",children:"Topic Name"}),e.jsx("input",{type:"text",id:"topicName",value:m,onChange:t=>f(t.target.value),className:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",isInvalid:!!b,required:!0}),e.jsx("p",{className:"text-red-500 text-xs mt-1",children:b})]}),e.jsx("button",{type:"submit",className:"mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600",children:"Submit"})]})]})}),e.jsx("div",{className:`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 ${q?"block":"hidden"}`,children:e.jsxs("div",{className:"bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 dark:text-gray-100",children:"Confirm Delete"}),e.jsx("p",{className:"mt-4 text-gray-900 dark:text-gray-100",children:"Are you sure you want to delete this subject and all its topics?"}),e.jsxs("div",{className:"flex justify-end mt-4 space-x-2",children:[e.jsx("button",{className:"bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600",onClick:()=>g(!1),children:"Cancel"}),e.jsx("button",{className:"bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600",onClick:J,children:"Delete"})]})]})}),e.jsx("div",{className:`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 ${P?"block":"hidden"}`,children:e.jsxs("div",{className:"bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 dark:text-gray-100",children:"Confirm Delete"}),e.jsx("p",{className:"mt-4 text-gray-900 dark:text-gray-100",children:"Are you sure you want to delete this topic? This will delete all the questions related to this topic."}),e.jsxs("div",{className:"flex justify-end mt-4 space-x-2",children:[e.jsx("button",{className:"bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600",onClick:()=>p(!1),children:"Cancel"}),e.jsx("button",{className:"bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600",onClick:Y,children:"Delete"})]})]})})]})};export{se as default};
