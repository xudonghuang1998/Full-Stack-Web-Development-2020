(this.webpackJsonptest=this.webpackJsonptest||[]).push([[0],{23:function(e,n,t){},43:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t(1),c=t(17),u=t.n(c),s=(t(23),t(8)),o=t(3),i=t.n(o),l=t(6),d=t(4),b=function(e){var n=e.searchName,t=e.handleSearchChange;return Object(r.jsx)("form",{children:Object(r.jsxs)("div",{children:["filter shown with:",Object(r.jsx)("input",{value:n,onChange:t})]})})},j=function(e){var n=e.addPerson,t=e.newName,a=e.handleNameChange,c=e.newNumber,u=e.handleNumberChange;return Object(r.jsxs)("form",{onSubmit:n,children:[Object(r.jsxs)("div",{children:["name:",Object(r.jsx)("input",{value:t,onChange:a})]}),Object(r.jsxs)("div",{children:["number:",Object(r.jsx)("input",{value:c,onChange:u})]}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"submit",children:"add"})})]})},f=function(e){var n=e.searchedPersons,t=e.deletePerson;return Object(r.jsx)("ul",{children:n.map((function(e,n){return Object(r.jsxs)("li",{className:"person",children:[e.name," ",e.number,Object(r.jsx)("button",{onClick:function(){t(e.id,e.name)},children:"delete"})]},n)}))})},h=t(5),m=t.n(h),O="/api/persons",p={getAll:function(){return m.a.get(O).then((function(e){return e.data}))},create:function(e){return m.a.post(O,e).then((function(e){return e.data}))},update:function(e,n){return m.a.put("".concat(O,"/").concat(e),n).then((function(e){return e.data}))},del:function(){var e=Object(l.a)(i.a.mark((function e(n){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.delete("".concat(O,"/").concat(n));case 2:return t=m.a.get(O),e.abrupt("return",t.then((function(e){return e.data})));case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()},x=function(){var e=Object(a.useState)([{name:""}]),n=Object(d.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),o=Object(d.a)(u,2),h=o[0],m=o[1],O=Object(a.useState)(""),x=Object(d.a)(O,2),v=x[0],w=x[1],g=Object(a.useState)(""),N=Object(d.a)(g,2),k=N[0],C=N[1],S=Object(a.useState)(null),P=Object(d.a)(S,2),y=P[0],T=P[1],D=Object(a.useState)(null),A=Object(d.a)(D,2),E=A[0],J=A[1],L=!1,B=function(e){var n=e.message;return null===n?null:Object(r.jsx)("div",{className:"success",children:n})},I=function(e){var n=e.message;return null===n?null:Object(r.jsx)("div",{className:"error",children:n})};Object(a.useEffect)((function(){p.getAll().then((function(e){c(e)}))}),[]);var q=t.filter((function(e){return e.name.toLowerCase().includes(k.toLowerCase())})),z=function(){var e=Object(l.a)(i.a.mark((function e(n){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),!t.some((function(e){return e.name===h}))){e.next=8;break}if(!window.confirm("".concat(h," is already added to the phonebook, replace the old number with a new one?"))){e.next=6;break}return e.next=6,F();case 6:e.next=16;break;case 8:return r={name:h,number:v},e.next=11,p.create(r).then((function(e){c(t.concat(e)),m(""),w("")})).catch((function(e){L=!0,J(e.response.data.error),setTimeout((function(){J(null)}),5e3)}));case 11:if(!L){e.next=14;break}return L=!1,e.abrupt("return",null);case 14:T("".concat(h," added!")),setTimeout((function(){T(null)}),5e3);case 16:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),F=function(){var e=Object(l.a)(i.a.mark((function e(){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.find((function(e){return e.name===h})),r=Object(s.a)(Object(s.a)({},n),{},{number:v}),e.next=4,p.update(n.id,r).then((function(e){c(t.map((function(n){return n.name!==h?n:e})))})).catch((function(e){L=!0,J(e.response.data.error),setTimeout((function(){J(null)}),5e3)}));case 4:if(!L){e.next=7;break}return L=!1,e.abrupt("return",null);case 7:T("New number ".concat(v," added to ").concat(h,"!")),setTimeout((function(){T(null)}),5e3);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Phonebook"}),Object(r.jsx)(B,{message:y}),Object(r.jsx)(I,{message:E}),Object(r.jsx)(b,{searchName:k,handleSearchChange:function(e){C(e.target.value)}}),Object(r.jsx)("h2",{children:"add a new"}),Object(r.jsx)(j,{addPerson:z,newName:h,handleNameChange:function(e){m(e.target.value)},newNumber:v,handleNumberChange:function(e){w(e.target.value)}}),Object(r.jsx)("h2",{children:"Numbers"}),Object(r.jsx)(f,{searchedPersons:q,deletePerson:function(e,n){window.confirm("Delete ".concat(n," ?"))&&(p.del(e).then((function(e){c(e)})),T("".concat(n," Deleted!")),setTimeout((function(){T(null)}),5e3))}})]})};u.a.render(Object(r.jsx)(x,{}),document.getElementById("root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.298a50cd.chunk.js.map