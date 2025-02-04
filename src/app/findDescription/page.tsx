"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Arrow from "@/components/button/arrow/arrow";
// import style from "../index.module.css";
import cameraStyle from "../photography/camera.module.css";
import style from "./findDescription.module.css";

export default function Page() {
    const router = useRouter();

    const startPhotoGraphy = () => {
        router.push("./photography");
    };

    return (
        <div>
            <Arrow backPath="/" />
            <div onClick={startPhotoGraphy} className={style.findWrapper}>
                <div className={style.descriptionWrap}>
                    <h1 className={style.descriptionTit}>しらないものをみつけにいこう！</h1>
                </div>
                <div className={cameraStyle.characterWrap}>
                    <Image
                        className={style.character}
                        src="/character.png"
                        alt="キャラクター"
                        width={80}
                        height={80}
                    />
                </div>
                <Image
                    src="/handGesture.png"
                    alt="タップしてね"
                    className={cameraStyle.handGestureImg}
                    width={200}
                    height={150}
                />
            </div>
        </div>
    );
}
