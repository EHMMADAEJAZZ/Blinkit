import { useState } from 'react';
import Table from './Table';
import { createColumnHelper } from '@tanstack/react-table';
import ViewImage from './ViewImage';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteForever } from 'react-icons/md';
import { subcategoryApis } from '../common/api';
import { toast } from 'react-toastify';
import ConfirmDeleteBox from './ConfirmDeleteBox';
import UpdateSubCategory from './UpdateSubCategory';
import NoData from './NoData';
import SubCategorySkeleton from '../skeleton/SubCategorySkeleton';
const SubCategory = ({ data, isLoading, fetchSubCategory }) => {
  const [isOpen, setisOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteId, SetDeleteId] = useState('');
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [openUpdateBox, setOpenUpdateBox] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const toggleOpen = () => {
    setisOpen(!isOpen);
  };
  const toggleConfirmBox = () => {
    setOpenConfirmBox(!openConfirmBox);
  };
  const toggleUpdateBox = () => {
    setOpenUpdateBox(!openUpdateBox);
  };
  const deletSubCategory = async (id) => {
    setLoading(true);
    try {
      const response = await subcategoryApis.deleteSubCategory(id);
      toast.success(response?.message);
      fetchSubCategory();
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = (id) => {
    toggleConfirmBox();
    SetDeleteId(id);
  };
  const handleUpdate = (editData) => {
    toggleUpdateBox();
    setUpdateData(editData);
  };
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('name', {
      header: 'name',
    }),
    columnHelper.accessor('image', {
      header: 'image',
      cell: ({ row }) => {
        return (
          <div
            onClick={() => {
              toggleOpen();
              setSelectedImg(row.original.image);
            }}
            className=' flex justify-center items-center cursor-pointer'
          >
            <img
              src={row.original.image}
              alt={row.original.name}
              className='w-10 h-10 pt-2 '
            />
          </div>
        );
      },
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: ({ row }) => {
        return (
          <>
            {row.original.category.map((c, index) => (
              <span className='text-xs xs:text-sm capitalize' key={index}>
                {c.name},{' '}
              </span>
            ))}
          </>
        );
      },
    }),
    columnHelper.accessor('_id', {
      header: 'Action',
      cell: ({ row }) => {
        return (
          <div className='flex justify-center gap-3 items-center flex-wrap'>
            <button
              onClick={() => {
                handleUpdate(row.original);
              }}
              className='border border-green-700  rounded-full p-1 text-xs sm:text-sm text-black bg-green-400 hover:bg-green-700 transition-all duration-300 hover:text-white '
            >
              <CiEdit size={20} className='w-full' />
            </button>
            <button
              onClick={() => handleDelete(row.original._id)}
              className='border border-red-700  rounded-full p-1 text-xs sm:text-sm text-black bg-red-400 hover:bg-red-700 transition-all duration-300 hover:text-white'
            >
              <MdDeleteForever size={20} className='w-full ' />
            </button>
          </div>
        );
      },
    }),
  ];
  if (isLoading) {
    return (
      <div className='max-w-screen-lg mx-auto py-5 '>
        <SubCategorySkeleton/>
      </div>
    );
  }
  return (
    <section>
      <div>
        {data.length > 0 ? (
          <Table data={data} columns={columns} />
        ) : (
          <div className='mt-5  flex justify-center items-center'>
            <NoData />
          </div>
        )}
      </div>

      {isOpen && <ViewImage image={selectedImg} onCloseModel={toggleOpen} />}
      {openConfirmBox && (
        <ConfirmDeleteBox
          closeModel={toggleConfirmBox}
          label='Are you sure you want to delete this sub category?'
          deleteHandler={deletSubCategory}
          deleteId={deleteId}
          deleting={loading}
        />
      )}
      {openUpdateBox && (
        <UpdateSubCategory
          closeModel={toggleUpdateBox}
          fetchSubCategory={fetchSubCategory}
          data={updateData}
        />
      )}
    </section>
  );
};

export default SubCategory;
