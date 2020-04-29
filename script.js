    // Instantiate MDC Drawer
const drawerEl = document.querySelector('.mdc-drawer');
const drawer = new mdc.drawer.MDCDrawer.attachTo(drawerEl);

    // Instantiate MDC Top App Bar (required)
const topAppBarEl = document.querySelector('.mdc-top-app-bar');
const topAppBar = new mdc.topAppBar.MDCTopAppBar.attachTo(topAppBarEl);
topAppBar.setScrollTarget(document.querySelector('.main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
drawer.open = !drawer.open;
});


 

const hide = () => {
    let views = document.querySelectorAll("div.view");
    for(let i = 0; i<views.length; i++){
        views[i].style.display = "none";
    }
};


let items = document.querySelectorAll("aside.mdc-drawer a.mdc-list-item");
for(let i = 0; i<items.length; i++){
    items[i].addEventListener("click", event => {
        hide();
        let target = items[i].getAttribute("href");
        document.querySelector(target).style.display = "block";
        drawer.open = false;
        
    });
}
window.addEventListener("load", (e) =>{
    hide();
    let home = document.querySelector("aside.mdc-drawer a.mdc-list-item");
    home.style.display = "block";
})