"use client";
import Camera from "../components/button/camera/camera";
import Picture from "../components/button/picture/Picture";
import style from "./index.module.css";

export default function Page() {
    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <div className={style.logo}></div>
                <div className={style.btnWrap}>
                    <Camera />
                    <Picture />
                </div>
            </div>
        </div>
    );
}
