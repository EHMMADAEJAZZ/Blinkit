import Model from '../UI/Model';
const ViewImage = ({ image, onCloseModel }) => {
  return (
    <section className='h-full w-full'>
      <Model
        onCloseModel={onCloseModel}
        className=' max-h-[400px] max-w-sm'
      >
        <div className='max-h-full  flex items-center'>
          <img
            src={image}
            alt='subcategory_image'
            className='w-full h-[400px] object-cover'
          />
        </div>
      </Model>
    </section>
  );
};

export default ViewImage;
