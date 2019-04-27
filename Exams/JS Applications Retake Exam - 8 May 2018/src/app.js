$(() => {
    showHideLinks(); //прави нещо в зависимост от това дали има user или не
    attachLinkEvents();   //закача на всеки бутон негово menu
    attachButtonEvents(); //за login, register  и други после

    attachBoxesEvents();
    showHomeView();
   // renderHomeView()
});