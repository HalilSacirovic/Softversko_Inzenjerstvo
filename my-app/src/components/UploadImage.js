import React from "react";
import axios from "axios";
import { Button, Box } from "@mui/material";
import ImageUploading from "react-images-uploading";

function UploadImage() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const [uploadStatus, setUploadStatus] = React.useState("");

  const onChange = (imageList) => {
    setImages(imageList);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image.file);
    });

    console.log("Form data: ", formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success) {
        console.log("Uploaded images:", response.data.images);
        setUploadStatus("Upload Successful!");
      } else {
        setUploadStatus("Upload Failed!");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      setUploadStatus("Error occurred during upload.");
    }
  };

  return (
    <div>
      <Box
        sx={{
          width: "500px",
          height: "400px",
          backgroundColor: "whitesmoke",
          borderRadius: "5px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginTop: "10px",
          marginBottom: "20px",
          border: "1px solid black",
          overflowY: "auto",
          padding: "10px",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {images.length > 0 ? (
          images.map((image, index) => (
            <div
              key={index}
              style={{
                width: "500px",
                height: "200px",
                position: "relative",
                margin: "5px",
              }}
            >
              <img
                src={image["data_url"]}
                alt={`Selected ${index}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          ))
        ) : (
          <p>ADD IMAGE</p>
        )}
      </Box>

      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({ onImageUpload, dragProps }) => (
          <div className="upload__image-wrapper">
            <Button
              sx={{ color: "black", backgroundColor: "orange", margin: "5px" }}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </Button>
          </div>
        )}
      </ImageUploading>

      <Button
        sx={{ color: "white", backgroundColor: "green", margin: "5px" }}
        onClick={handleImageUpload}
      >
        Upload to Server
      </Button>

      <div>{uploadStatus}</div>
    </div>
  );
}

export default UploadImage;
