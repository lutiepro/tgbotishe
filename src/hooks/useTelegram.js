const tg = window.Telegram.webApp;

export function useTelegram (){

    const onClose =()=>{
        tg.close()
    }
    const onToggleButton =()=>{
        if (tg.MainButton.isVisible){
            tg.MainButton.hide();
        } else {
            tg.MainButton.show()
        }
    }
    return{
        onClose,
        onToggleButton,
        tg,
        user: tg.initDataUnsafe?.user,
    }
}