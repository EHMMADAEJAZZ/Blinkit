import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
const Table = ({data,columns}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
     <div className="p-2">
      <table className='w-full py-0 border-collapse'>
        <thead className='bg-black text-white  '>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className=''>
              <th className='border capitalize px-2 text-xs sm:text-sm font-semibold'>Sr.No</th>
              {headerGroup.headers.map(header => (
                <th key={header.id} className='border font-semibold capitalize px-2 text-xs sm:text-sm py-2'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className=''>
          {table.getRowModel().rows.map((row ,index)=> (
            
            <tr key={row.id} className=''>
              <td className='border px-2 pt-2'>{index+1}</td>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className='border px-2 py-1 shadow-sm shadow-gray-200'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
   
    </div>
  )
}

export default Table