// document.documentElement.classList.add("debug");
document.addEventListener("keydown", (e)=>{
    if (e.ctrlKey || e.metaKey) document.documentElement.classList.add("debug");
});
document.addEventListener("keyup", ()=>{
    document.documentElement.classList.remove("debug");
});

//# sourceMappingURL=index.fd8346a5.js.map
