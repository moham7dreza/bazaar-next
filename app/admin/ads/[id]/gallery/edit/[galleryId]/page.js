import React from "react";
import GalleryEditForm from "./GalleryEditForm";

const GalleryEditPage = async ({ params }) => {
  const { id, galleryId } = await params;
  return (
    <div className="w-full p-4">
      <GalleryEditForm galleryId={galleryId} advertisementId={id} />
    </div>
  );
};

export default GalleryEditPage; 