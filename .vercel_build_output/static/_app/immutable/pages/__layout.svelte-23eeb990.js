import{S as T,i as V,s as G,F as J,e as u,t as E,k as F,c as x,a as y,h as I,d as c,m as H,b as h,g as v,G as k,o as _,p as K,q as z,H as P,I as O,J as Q,K as W,n as X,w as R,x as q,y as L,B as U}from"../chunks/index-afd08e74.js";import{l as S,B as D}from"../chunks/Button-a8edf08d.js";import"../chunks/index-9f318f14.js";function Y(n){let t,r;return t=new D({props:{buttonType:"primary",onClick:n[2],$$slots:{default:[tt]},$$scope:{ctx:n}}}),{c(){R(t.$$.fragment)},l(e){q(t.$$.fragment,e)},m(e,s){L(t,e,s),r=!0},p(e,s){const d={};s&16&&(d.$$scope={dirty:s,ctx:e}),t.$set(d)},i(e){r||(z(t.$$.fragment,e),r=!0)},o(e){_(t.$$.fragment,e),r=!1},d(e){U(t,e)}}}function Z(n){let t,r;return t=new D({props:{buttonType:"primary",onClick:n[1],$$slots:{default:[et]},$$scope:{ctx:n}}}),{c(){R(t.$$.fragment)},l(e){q(t.$$.fragment,e)},m(e,s){L(t,e,s),r=!0},p(e,s){const d={};s&16&&(d.$$scope={dirty:s,ctx:e}),t.$set(d)},i(e){r||(z(t.$$.fragment,e),r=!0)},o(e){_(t.$$.fragment,e),r=!1},d(e){U(t,e)}}}function tt(n){let t;return{c(){t=E("Register")},l(r){t=I(r,"Register")},m(r,e){v(r,t,e)},d(r){r&&c(t)}}}function et(n){let t;return{c(){t=E("Log In")},l(r){t=I(r,"Log In")},m(r,e){v(r,t,e)},d(r){r&&c(t)}}}function rt(n){let t,r,e,s,d,g,i,a,$,w,f;const C=[Z,Y],b=[];function A(o,p){return o[0]==="registration"?0:o[0]==="login"||o[0]==="forgotPassword"?1:-1}~(i=A(n))&&(a=b[i]=C[i](n));const j=n[3].default,l=J(j,n,n[4],null);return{c(){t=u("header"),r=u("nav"),e=u("a"),s=E("Stox"),d=F(),g=u("div"),a&&a.c(),$=F(),w=u("main"),l&&l.c(),this.h()},l(o){t=x(o,"HEADER",{class:!0});var p=y(t);r=x(p,"NAV",{class:!0});var m=y(r);e=x(m,"A",{href:!0,class:!0});var B=y(e);s=I(B,"Stox"),B.forEach(c),d=H(m),g=x(m,"DIV",{class:!0});var M=y(g);a&&a.l(M),M.forEach(c),m.forEach(c),p.forEach(c),$=H(o),w=x(o,"MAIN",{class:!0});var N=y(w);l&&l.l(N),N.forEach(c),this.h()},h(){h(e,"href","/"),h(e,"class","text-3xl font-bold"),h(g,"class","flex gap-4"),h(r,"class","flex h-full items-center justify-between"),h(t,"class","h-16 w-full border-b-2 bg-white px-8 sm:px-16"),h(w,"class","bg-gray-100 p-8 sm:px-16 svelte-1aj66a1")},m(o,p){v(o,t,p),k(t,r),k(r,e),k(e,s),k(r,d),k(r,g),~i&&b[i].m(g,null),v(o,$,p),v(o,w,p),l&&l.m(w,null),f=!0},p(o,[p]){let m=i;i=A(o),i===m?~i&&b[i].p(o,p):(a&&(X(),_(b[m],1,1,()=>{b[m]=null}),K()),~i?(a=b[i],a?a.p(o,p):(a=b[i]=C[i](o),a.c()),z(a,1),a.m(g,null)):a=null),l&&l.p&&(!f||p&16)&&P(l,j,o,o[4],f?Q(j,o[4],p,null):O(o[4]),null)},i(o){f||(z(a),z(l,o),f=!0)},o(o){_(a),_(l,o),f=!1},d(o){o&&c(t),~i&&b[i].d(),o&&c($),o&&c(w),l&&l.d(o)}}}function ot(n,t,r){let e;W(n,S,a=>r(0,e=a));let{$$slots:s={},$$scope:d}=t;const g=()=>{S.set("login")},i=()=>{S.set("registration")};return n.$$set=a=>{"$$scope"in a&&r(4,d=a.$$scope)},[e,g,i,s,d]}class st extends T{constructor(t){super(),V(this,t,ot,rt,G,{})}}export{st as default};