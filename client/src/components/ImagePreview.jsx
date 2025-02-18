
const ImagePreview = ({image,className}) => {
  return (
    <div className={`w-full h-full gap-2 flex justify-center items-center ${className}`}>
                  {image  ? (
                    <img
                      src={image }
                      alt='caegory image'
                      className='w-full h-full'
                    />
                  ) : (
                     <p>image</p>
                  )}
                </div>
  )
}

export default ImagePreview