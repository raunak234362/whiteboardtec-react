import Service from "../../config/service";
import { useEffect } from "react";

const GalleryImages = ({ department }:any) => {
    console.log("Selected Department:", department);
    const fetchImages = async () => { 
        const response = await Service.Gallery(department);
        console.log("Fetched Images:", response);
    }
    useEffect(() => {
        fetchImages();
    }, [department]);
    
    return (
        <div className="w-screen h-screen text-4xl text-black bg-white">GalleryImages</div>
    );
};


export default GalleryImages