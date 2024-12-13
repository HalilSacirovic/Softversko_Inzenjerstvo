import { Button, Box } from "@mui/material";
import React from "react";
import ImageUploading from "react-images-uploading";

function UploadImage() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList) => {
    setImages(imageList);
  };

  const updateImage = (index) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const updatedImages = [...images];
          updatedImages[index] = {
            ...updatedImages[index],
            data_url: e.target.result,
          };
          setImages(updatedImages);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, imgIndex) => imgIndex !== index);
    setImages(updatedImages);
  };

  return (
    <div className="not_app">
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
            display: "none", // Sakriva scroll traku u preglednicima baziranim na WebKit-u
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
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflowY: "auto",
                backgroundColor: "white",
                boxShadow: "0 0 5px rgba(0,0,0,0.5)",
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
              <div
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <Button
                  size="small"
                  sx={{
                    backgroundColor: "orange",
                    color: "black",
                  }}
                  onClick={() => updateImage(index)}
                >
                  Update
                </Button>
                <Button
                  size="small"
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                  }}
                  onClick={() => removeImage(index)}
                >
                  Remove
                </Button>
              </div>
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
              sx={{
                color: "black",
                backgroundColor: "orange",
                margin: "5px",
              }}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </Button>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default UploadImage;
