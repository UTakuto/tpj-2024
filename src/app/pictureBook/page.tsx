"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import "../index.module.css";
import Style from "@/app/photography/camera.module.css";
import style from "./pictureBook.module.css";
import Arrow from "@/components/button/arrow/arrow";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
interface WordData {
    id: string;
    word: string;
    description: string;
    imageUrl: string | null;
}

export default function PictureBook() {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 2;
    const [words, setWords] = useState<WordData[]>([]);
    const [loading, setLoading] = useState(true);

    const handleNext = () => {
        if ((currentPage + 1) * itemsPerPage < words.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const wordsRef = collection(db, "words");
                const q = query(wordsRef, orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);

                const wordsData = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        word: data.word,
                        description: data.description,
                        imageUrl: data.imageUrl || null, // Firestoreに保存された画像URL
                    };
                });

                setWords(wordsData);
            } catch (error) {
                console.error("Error fetching words:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWords();
    }, []);

    return (
        <>
            <div className={style.header}>
                <Arrow backPath="/" />
            </div>
            <div className={style.container}>
                <div className={style.contentWrapper}>
                    {words
                        .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                        .map((word) => (
                            <div key={word.id} className={style.wordCard}>
                                <h2 className={style.wordName}>{word.word}</h2>
                                <div className={style.imageContent}>
                                    {word.imageUrl && (
                                        <div className={style.imageContainer}>
                                            <Image
                                                src={word.imageUrl}
                                                alt={`${word.word}の写真`} // alt属性を追加
                                                width={300}
                                                height={300}
                                                className={style.wordImage}
                                            />
                                        </div>
                                    )}
                                </div>
                                <p className={style.wordDescription}>{word.description}</p>
                            </div>
                        ))}
                </div>
                <div className={style.navButtons}>
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 0}
                        className={style.navButton}
                    >
                        もどる
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={(currentPage + 1) * itemsPerPage >= words.length}
                        className={style.navButton}
                    >
                        すすむ
                    </button>
                </div>
            </div>
        </>
    );
}
