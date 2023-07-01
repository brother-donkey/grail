document.documentElement.classList.add("debug");
document.addEventListener("keydown", (e)=>{
    if (e.ctrlKey || e.metaKey) document.documentElement.classList.remove("debug");
});
document.addEventListener("keyup", ()=>{
    document.documentElement.classList.add("debug");
});

//# sourceMappingURL=index.3d4e828d.js.map
