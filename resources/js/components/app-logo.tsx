import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className=" text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <div className="size-5 fill-current text-black">
                    <AppLogoIcon img='images/stockontrol-logo.png' />
                </div>
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">Stockontrol</span>
            </div>
        </>
    );
}
