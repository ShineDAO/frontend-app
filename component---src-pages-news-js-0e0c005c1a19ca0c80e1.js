(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{FJi0:function(e,t,n){"use strict";n.r(t);var a=n("q1tI"),r=n.n(a),o=n("1Qp6"),l=(n("oR2e"),n("KQm4")),i=n("HaE+"),c=n("o0o1"),s=n.n(c),d=n("/19t"),u=n("zrW2"),h=n("Gi8J"),f=n.n(h),p=n("gm8Z"),m=n.n(p);function Y(){return(Y=Object(i.a)(s.a.mark((function e(t,n,a,r){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("article id ",t),n(t).then((function(e){console.log("result from voting",e),r()})).catch((function(e){console.log("error while voting",e),a(e)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function g(){return(g=Object(i.a)(s.a.mark((function e(t,n){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!confirm("Are you sure that you want to delete the article")){e.next=5;break}return e.next=3,t();case 3:console.log("deleted"),n();case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function A(e){var t=e.title,n=e.domain,l=e.articleId,i=e.url,c=e.userVotedAlready,s=e.createdAt,h=e.author,p=e.totalScore,A=e.setServiceError,E=e.getRankedArticles,b=e.userRoles,O=e.index,y=Object(a.useContext)(u.a).theme,j=Object(d.c)("voteOnArticle",{articleId:l},{autoFetch:!1}),v=j.fetch,P=(j.data,j.error),k=j.isLoading,x=Object(d.c)("deleteArticle",{articleId:l},{autoFetch:!1}),q=x.fetch;x.data,x.error,x.isLoading;Object(a.useEffect)((function(){P&&"Validation failed. Please login to continue."==P.message?A("Only authenticated users can upvote. Please try to connect your wallet"):P&&"User already voted"==P.message?A("You already voted"):P&&P&&A(P.message)}),[P]);var z=((new Date).getTime()-new Date(s).getTime())/1e3/60/60;return r.a.createElement("div",{style:{paddingLeft:10}},r.a.createElement("div",{style:{fontWeight:"bold"}},r.a.createElement("h4",{style:{display:"inline-block",marginRight:5,color:"#a2a2a2"}},O+1,". "),!c&&r.a.createElement("div",{style:{display:"inline-block"}},r.a.createElement(m.a,{style:{},color:"#3f3d56",loading:k,size:3,margin:2}),r.a.createElement("img",{style:{cursor:"pointer",height:13,marginRight:3},onClick:function(){return function(e,t,n,a){return Y.apply(this,arguments)}(l,v,A,E)},src:f.a})),r.a.createElement(o.h,{href:i},t," "),r.a.createElement("span",{style:{fontWeight:"normal",fontSize:"small",color:"#a2a2a2"}},"(",n,") ")),r.a.createElement(o.k,{theme:y},r.a.createElement("span",{style:{fontWeight:"normal"}},parseInt(p)," points ")," ",r.a.createElement("span",null,"by")," ",r.a.createElement("span",{style:{fontWeight:"normal"}}," ",h,",")," ",r.a.createElement("span",null," submitted ",Number.parseFloat(z).toFixed(2)," hours ago "),b&&b.includes("Moderator")&&r.a.createElement("span",{onClick:function(){return function(e,t){return g.apply(this,arguments)}(q,E)},style:{fontWeight:"bold",cursor:"pointer"}},"Delete")))}var E=n("HoMr");function b(e,t){return t.totalScore-e.totalScore}function O(){var e=Object(d.b)().Moralis,t=Object(d.b)(),n=t.authenticate,c=t.isAuthenticated,u=t.user,h=Object(d.d)("Article"),f=h.data,p=h.error,Y=h.isLoading,g=Object(d.d)("User"),O=(g.data,g.error,g.isLoading,Object(a.useState)("")),y=O[0],j=O[1],v=Object(a.useState)(""),P=v[0],k=v[1],x=Object(a.useState)(),q=x[0],z=x[1],R=Object(a.useState)(!1),J=R[0],Q=R[1],S=Object(a.useState)(),C=S[0],w=S[1],I=Object(a.useState)(),V=I[0],M=I[1],T=Object(a.useState)(),U=T[0],N=T[1],D=Object(d.c)("saveArticle",{title:y,url:P},{autoFetch:!1}),H=D.fetch,F=D.data,W=D.error,G=D.isLoading,L=Object(d.c)("onboardPreviousDataIfOldUser",{ethAddress:U},{autoFetch:!1}),K=L.fetch;L.data,L.error,L.isLoading;Object(a.useEffect)((function(){if(console.log("user 3213",u),null!==u){var e=u.get("ethAddress");console.log(" user data 321 ",e),B(),N(e)}}),[u]),Object(a.useEffect)((function(){console.log(" is authenticated ",c)}),[c]),Object(a.useEffect)((function(){void 0!==U&&(console.log("eth address data ",U),K())}),[U]);var X=Object(d.c)("getRankedArticles",{},{autoFetch:!0}),B=X.fetch,Z=X.data;X.error,X.isLoading;Object(a.useEffect)((function(){console.log(" here are the articles ",F,typeof F),"Success"==F&&(console.log("also called"),Q(!1),M("Article submitted successfully!"),j(""),k(""),B(),window.location.reload(!0))}),[F]);var _=Object(d.c)("onboardContributor",{},{autoFetch:!1}),$=(_.fetch,_.data,_.error,_.isLoading,Object(d.c)("getShnPrice",{},{autoFetch:!0})),ee=($.fetch,$.data);$.error,$.isLoading;Object(a.useEffect)((function(){ee&&console.log("data ",ee)}),[ee]);var te=Object(d.c)("getShnWeightedBalance",{},{autoFetch:!1}),ne=(te.fetch,te.data),ae=(te.error,te.isLoading,Object(d.c)("getUserRoles",{},{autoFetch:!0})),re=(ae.fetch,ae.data);ae.error,ae.isLoading;if(Object(a.useEffect)((function(){console.log("user roles ",re)}),[re]),Object(a.useEffect)((function(){console.log("isSaveArticleLoading",G),G&&Q(!1)}),[G]),p)return r.a.createElement("span",null,"🤯 Oops, there has been some error. Please hard refresh the page to clean the storage. (Mac users: Hold down Shift and click the Reload button. Windows users: hold down Ctrl and then press F5) ");if(Y)return r.a.createElement("span",null,"🙄 loading...");function oe(){return(oe=Object(i.a)(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.User.logOut();case 2:window.location.reload(!0);case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return r.a.createElement("div",{style:{width:"100%"}},r.a.createElement("div",{style:{boxShadow:"0px 3px 0px 0px",display:"flex",alignItems:"baseline",background:"rgb(250 218 94)",margin:"0 auto"}},r.a.createElement("span",null,r.a.createElement("h2",{style:{color:"rgb(54 52 54)",display:"inline",paddingLeft:10}},"Degen News"))," ",r.a.createElement("span",{style:{paddingLeft:15,paddingRight:15}},"|"),r.a.createElement("span",{style:{cursor:"pointer"},onClick:function(){return function(e,t,n){console.log(" hello ",e),e?t(!0):n("Only vaccinated people can submit an article... 😷💉 👀  Nah, we are kidding, you actually have to be contributor. Go to the ShineDAO main page to find out what that is and to complete the onboarding."),J&&(M(),t(!J))}(c,Q,w)}},"Submit"),r.a.createElement("span",{style:{paddingLeft:15,paddingRight:15}},"|"),r.a.createElement("span",{style:{cursor:"pointer"},onClick:function(){return window.open("https://docs.shinedao.finance/community/degen-news","_self")}},"FAQ"),c?r.a.createElement("span",{onClick:function(){return function(){return oe.apply(this,arguments)}()},style:{marginLeft:"auto",paddingRight:8,cursor:"pointer"}},"Log out"):r.a.createElement("div",{style:{marginLeft:"auto"}},r.a.createElement(o.a,{backgroundHover:"#45e25a",onClick:function(){return Object(E.j)(n,e)}},"Connect Wallet"))),r.a.createElement("div",null,!1,c&&ee&&r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement(o.l,{style:{display:"inline-block"},color:"#181717",padding:"0px 0px 0px 10px"},"Welcome ",u.get("username"),", submit your most interesting DeFi news!"),r.a.createElement(o.l,{disableMobileFloat:"true",float:"right",style:{display:"inline-block",marginRight:8},color:"#ffa547",padding:"0px 0px 0px 10px"},"Current SHN price:"," ",r.a.createElement("a",{style:{cursor:"pointer",color:"#6c6c6f"},onClick:function(){return window.open("https://info.quickswap.exchange/pair/0xf6467b4178d54251d253ac0095f31444f0f6efbc","_self")}}," ","$",parseFloat(ee).toFixed(4)))),r.a.createElement(m.a,{style:{},color:"#3f3d56",loading:G,size:15,margin:10}),J&&r.a.createElement("div",{style:{paddingLeft:5}},r.a.createElement("label",{htmlFor:"title"},"Title: "),r.a.createElement("input",{value:y,onChange:function(e){return function(e,t){t(e.target.value)}(e,j)},type:"text",id:"title",name:"title"}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"url"},"URL: "),r.a.createElement("input",{value:P,onChange:function(e){return function(e,t){t(e.target.value)}(e,k)},type:"text",id:"url",name:"url"}),r.a.createElement("br",null),r.a.createElement(o.a,{onClick:function(){return!G&&H()}},"Submit")),!1,!1,!1,C&&" "+C,V&&r.a.createElement("div",{style:{paddingLeft:10}}," ",V,r.a.createElement("br",null)),W&&r.a.createElement("div",{style:{paddingLeft:10,color:"tomato"}}," Error: ",W.message," "),q&&r.a.createElement("div",null," ",q),ne&&ne.length>0&&ne.map((function(e){return r.a.createElement("div",null,"Symbol: ",e.symbol," ",e.balance)})),r.a.createElement("br",null),r.a.createElement("div",{style:{width:"100%"}},!1,Z&&0!=Z.length&&Object(l.a)(Z).sort(b).map((function(e,t){return r.a.createElement(A,{getRankedArticles:B,setServiceError:z,totalScore:e.totalScore,key:"key-"+t,index:t,author:e.author,url:e.url,createdAt:e.createdAt,articleId:e.articleId,title:e.title,domain:e.domain,userVotedAlready:e.userVotedAlready,userRoles:re})})))),console.log("type of articles",f.length),!1,!1,!1,!1,!1)}t.default=function(e){e.location;return r.a.createElement(d.a,{appId:"jTkB07PzkYA1pq8KpEaR3oDOApdmSpgJeCSXgJYF",serverUrl:"https://fsnbzd9rxwph.usemoralis.com:2053/server"},r.a.createElement(o.f,{position:"absolute",bottom:"4px",width:"100%",height:"60px"},r.a.createElement(o.j,{useDegenNews:"true",title:"Degen News",description:"Degenerate news 4 degenerate frens"}),!1,r.a.createElement("div",{style:{marginTop:6}}),r.a.createElement(o.i,{mobileWidth:"100%",width:"90%",background:"whitesmoke",style:{display:"flex",alignItems:"center",flexDirection:"column",paddingBottom:"200px"}},r.a.createElement(O,null))))}},Gi8J:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAggAAAIBCAMAAAAbLbeZAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAV9QTFRFAAAA/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y1/9Y17vPswAAAAHV0Uk5TAC9rseYJPv9wuPAPSIjP9hlQkNBVlQfh/Cp4FPPSIPdYoN4DMGywtedAgMUXmN8hZaUI6S0O8cMaUyxo6DrASYkYIqg/wd1grePTrNwjXys8FrSHWU8Q7JzVRITyS9H1ebnJmzi/7nRz2y5pO4/OAeoNTIzM5P49AgAAD09JREFUeJzt3Ql3FMcVhmGTxQ0SJBHY8UQ2SGgwESAsexBWAjIJxkYJMQ44cZw9dvbVWf//ifEGmp6Z6u6pqu/eqvf5BdVV98yZc+5Xt556CgAAAMBcx76gXgFM+OKXvqxeAgx4ummOq9cAA040zcqqehGQO9l85JR6FZD7yqNC+OrX1MuA2FrzsdPqdUDszCeFwE9C5Z5pPvWseiVQ+vpznxXC6BvqtUBovfncCfVaoPP8C48LoTmpXg1kTj9RB81Z9Wqgcm7jyUJoNtXrgcj5I3XQbI3VC4LEhWbKi+oVQeLidCHQjq7Ssek6oB1dp9YPAj8JVZrxg8BPQo2+OasQtkmo1ObSrDpomsvqdSGzK7MLYWVHvTBktTm7DprmqnplyGn80rxCGO2q14aMXp5XB03zinptyGdybX4hNHvq1SGb9QV1QEKlHtdfXVQIzSX1+pDJqYV10Oyr14c8vrWxuBCab6tXiCzOB+qAhEodboxChdDcVK8RGcxoP087mKgXieReC9dB06yrV4nkbnUpBAYmFO87Xeqgab6rXicSO9utEDZuqxeKpOa2n6fRji7aeKtrIYxeV68VCd3sWgdNc0e9VqQzOeheCM0x9WqRzML28zTa0cVaXelTCM0b6vUikcu96qB5U71epLHT7wehadbUK0YSp8NHf9QZ9YqRwm4oj9K2qV4zEgjmUdruklApz244j9J2qF41ovvegDpovk9CpTSd8ihtJFRK0ymP0kZCpTAnh9UBT3qU5t7QQthgYEJJOudR2kioFGT+OIQwBiYU5MXhddA0P1CvHrH0yqO0kVApRa88ShsJlUL0zKO0MTChDIFxCGEkVIqw07/9PI2ESgmuLl0HzRna0f4Naj9Pox3t3ysR6qB5i3a0dzdi1AHz+/07EacQDmhH+zZnGn9/zO/3bc40/v6Y3+/aEu3nabSjHVum/TyNdrRjPcYhhDEwwa3JdsxCoB3t1vGodUA72qvV5fIobbSjfeo5DiHslvqLMETvcQhhJ9XfhAF6j0MIY2CCQwPGIYSRUPFnwDiEMBIq7txPUQdN87b6u9DTnTSFcJeEii97aeqAhIo3kfIobdskVDyJlkdpI6HiyX66QljhSQ8/1tLVQdOcVn8duhp3fK9nmA2e9PDiMGUdNM159fehm8lzaQuh+aH6C9FJ5DxK20X1F6KL69dSF0LzQP2N6CB6HqWNhIoDD19NXwgkVByIMA4h7CztaOvOxRiHEMbABOsStZ+nbdGOti3SOIQw2tG2vZOrEBiYYFrC9vM02tGWRRuHEMbABMOStp+n0Y42azz4eY4hNhiYYNVhzjqgHW3WJOJ8lC5Ge+ovxkxLTuPvj3a0SddzdJuOoh1t0Y+y10Gzr/5mtD1Mcfs5hNvR9mRpP0+jHW1OpvbzNNrR1mRqP0+jHW1MtvbzNNrRtiS7/RxCO9qUwY/BL4/n5C3J2m06iufkDYk4jb8/5vfb8ZayEJr76s/Hpw6ldUA72orJlrYQRszvtyH57ecQ2tEmTGJP4++PnwQLsudR2njSw4DV+NP4++NJD71T6iJ4hIEJcjuKPEobAxPUEjzPMQRPeoids/GD0DTPqHeickme5xhii9Ca0g1NQG2Wm+q9qNpF9fE/dkBoTec19ek/aV29GxW7pT78J60QWlMRBtRmIbSmIgyozUJoTUQaUJuF0JrEOPM4hLARM1QUXlafe9sr6j2pUYZp/P0xMCG/DNP4+6MdnV2Wafz90Y7OTTIOIYyBCZmJxiGEMTAhL9E4hDAGJmRlqtt0FL2nnEx1m46i95SRsW7TUfSe8jmjPuxFeDs6G3PdpqO4HZ3JWHz7OWTET0IeN9UnHXJHvUN1MHD7OYTb0TkYuP0cwu3oDEzcfg7hdnR6JtvP02hHJ7fj4QeBdnR6Rm4/h3A7OrFdK7efQ36s3qnCmbn9HMLt6KQM3X4O4XZ0SoZuP4dwOzohw3mUNhIq6RjOo7SRUEnGdB6ljYRKKsZuP4dwOzoR43mUNm5HJ5H7MfjlcTs6Cfk0/v5IqCQw2VYf6wAkVOJzkEdpI6ESnYs8ShsJldhMTOPv7031vpXGyDT+/tbUO1cYo+MQws7Qjo5p10/7eRoDE2Jyk0dpu8tPQjx7fn8QSKjE5CiP0rZNQiWWB+qzXA4JlVhc5VHaSKhE4iyP0kZCJQ5neZQ2EipRuMujtJFQicDeNP7+SKhEYH4+ShckVJY2sTiNv7899T665zKP0kZCZUnXbU7j74+EynKc5lHa9tU76dttr3mUtnfVe+ma2zxKG096LMHROIQw2tHDuW4/T2NgwmCuxiGE0Y4eynn7eRrt6IHct5+n0Y4eZOy+/Txtg97TEIfqc4uPJz0G8DcOIWxE76k/h+MQwi6qd9Wfn7ynPrQk3lDvqzsupvH3x/z+npxM4++P+f39OJnG3x/z+3txM42/v0313rri+PZzCLeje3A8DiGMgQnd3VEfVkp3aUd3tac+q7SOq/fXjRPqo0prm3Z0N5fUJ5XaZfUOO3FFfVCprTyv3mIX1tTnlN5p9R57MD6rPqb0Nl5X77IDh+pTyoGEStBkS31IOYyY3x9SZB6ljYRKwORAfUSZ8JOwWCHjEMIYmLCQ0+c5hmBgwiLFjEMI40mPBdw+zzEET3rM91P14eT0M/Vu21V0HqWNhMo8RedR2kiozFF4HqWNhMpshedR2kiozFR8HqWNhMos++pjyW/ltnrTDaogj9JGQqWlhjxKGwmVlkP1mWiQUJlSRx6ljYTKlEryKG0kVI5YrSWP0va0eu9NKXQ+ShfMUHlCsfNRumCGymPFzkfpghkqnyt4PkoXm+r9N6Pg+ShdMEPlU3t15VHaeNLjE0U9zzHENgmVRx6oz0GPJz0eKex5jiF40uMjP1efggW/UJ+CAVW2n6dtkFDZVJ+BDVfV56A2rrT9PG1Ue0LlpvoErLijPgmtasYhhNWdUKk2j9JWdUKl4jxKW80JlYrzKG0VJ1SqzqO01ZtQqTqP0lZtQuW+euet2VSfiEhl4xDCtupsR99Q77s9dQ5MqG4cQthBje3ok+pdt6jGgQn31Jtu0cqO+liyo/08U3Xt6PFL6i23abSrPpnMaD/PUVk7+vo19Yab9UB9NlnRbZqrqt7Tzi/V223Yr9SnkxHdpgUq6j1Vfvs5ZFN9PtlUfvs5pJrb0ZVN4++vlvn9tJ8DKpnfX900/v7qaEfTfg6qYn5/hdP4+6uhHc04hA4qGJhAHqWTU+pzSu7X6i32YaP0hAp5lI4KT6iQR+mq8IQKeZTOik6oTMijdLenPq2E1tWb68kJ9Wmlc/1V9ea6ckl9XsmcUm+tL/vq80rlIXmUftbUJ5bIVfXGenO2zITKOfIofZWZUCGP0luRCRXyKAOUmFAhjzJAgQkV8iiDlJdQ2VdvqU/FJVTW1DvqVWkJFZ7nGKiwJz3IowxWVEKF5zmGK+pJD/IoSygoocLzHEu5oD6/aMijLKWYhAp5lCWVklAhj7KkQhIq5FGWVkZChTzK0opIqJBHiaCEhAp5lAgKeNKD5zmi8J9QIY8ShfsnPRiHEIn3hArjECL5je+BCbSfo3HdjmYcQjyuBybQfo7IcTua5zmi8jswgec5onLbjn5I+zkur8/J8zxHZGfVJzrMOdrPsW2qz3QQuk3Ruew9XVDvWok89p7oNiXg8HY0t5+T8Nd74vZzEiverkJy+zmR0+qT7Ynbz4k4ux1N+zkZV+1obj+n4+p2NO3nhBy1o7n9nNQx9fl29r56q8r2gfp8u+L2c2Jebkdz+zkxJ7ejuf2cnI/b0dx+Ts7F7WhuP2fg4XY0eZQMHCRUuP2chf2ECnmULMzfjiaPkon1hMpv1RtUC+MJFdrP2ZhuR3P7OR/Tt6NpP2dkuB3NY/BZ2b0dzfDtrMzejqb9nJnVdjTt58yMtqNpP2dnsx1N+zk7k+3o++pdqZHFdjTtZwGDz8nzGLyEvXb0RfWW1Gnb2k/CA/WO1GpdffJTbqk3pFbGnpNnGr+MrYQK4xBkTCVUmI8iZGiGypgfBCFDM1TeVu9F3X6nPv/PTAioSY2sJFSOq3eidhfVFfAJnueQe6CugY/xPIfcLXUNPMLzHAZYeNKD5zkMMPCkB89zmLCproOnzqu3AI9sqUNrPM9hxIviQmAcghHigQmMQzBD246+ov58fGZF+Zw87WdDhO3o8T31x+OxDd3AhEP1t+NJ51V1QPvZFlk7mvazMaJ29Op76g/HlN9LCoH2szmSdvTOivqz0aJoR9N+NuhM/jrYpf1s0Wb2QqD9bNLd3O3oPZ7nsOlm5kJgHIJRmQcmMA7BrLwzVP6g/lzM88ecCRXyKIblTKjsqz8W82UcmEAexbRsCRXGIdi28XqmQjhUfykWy5RQGW+pPxSLjfL8JPBej3lZXvmZHKg/E0EXMhQC7/U4kOGVH8YhuJA+oUIexYXkAxMYh+DEZuJCII/iROKBCTfIo3iRNqHCOAQ3DlImVN5Qfx26ez9hIfA8hyMJn/TgeQ5XTiUrBNrPriSb37+p/jL0czVNHdB+9iZRO5r2sztJEiq0n/0ZHUtQCH9SfxX6eyd+HVyn/ezRpeiFcEr9SRhiP3YdPKT97NNa5EK4qv4gDHM2bjv6HO1nrw6jFsId9edgqK2Y7ejX1F+D4f4csRBoPzsWsR3NOATX4g1MYByCa9EGJjAOwblIAxMYh+BdpITKofo7sKw4CZW/qD8DS7sfoQ7IoxQgwsAE8ihFWD6hwjiEIiw9MGGV5znKsGxChTxKId5crg52yKOUYrmEyrPq5SOWpV75IY9SkGUSKuRRCrJEQuWGeu2IafiTHsxHKcrB0IQKeZTCDE2ofEW9cMT1ws6gOmAcQnEGJVTGL6mXjdg2dgcUAu3nAg1oR0+uqReNBPZ6F8L76iUjhQ/61gHT+AvVd34/0/gL1XN+P9P4i7XZqxDoNhWr1/z+v6pXi3T+1qMQ6DYVrMf8frpNRVvvXAhX1EtFSitde0/cfi5c197TPfVCkVbH3tOhep1IrdOw7gnt5+KNuvSeuOxYgYvhOuCyYxX+HiyEy+olIodboTrY4QehDqF29D/UC0QeHy6ug9u0n2ux+HY0eZRqfPhPfhDwyLsLCoHnOSqy4EmPG4xDqMnNuYVAHqUq//r3nDr4j3plyOu/cwrhf+qFIbPnF/xfBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAn/8DpPgrbN7VEwgAAAAASUVORK5CYII="}}]);
//# sourceMappingURL=component---src-pages-news-js-0e0c005c1a19ca0c80e1.js.map