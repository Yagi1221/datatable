import React, { useEffect, useState, useMemo } from 'react';
import { TableHeader, Pagination, Search } from '../../components/DataTable';
import axios from 'axios';
const DataTable = () => {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const perPagesCount = 3;

  const headers = [
    { name: 'ID', field: '_id' },
    { name: 'User', field: 'user' },
    { name: 'Text', field: 'text' },
    { name: 'Source', filed: 'source' },
    { name: 'Updated Time', filed: 'updateAt' },
    { name: 'Type', filed: 'type' },
    { name: 'Create Time', filed: 'createdAt' },
  ];

  useEffect(() => {
    const getData = () => {
      axios
        .get('https://cat-fact.herokuapp.com/facts/')
        .then(function (response) {
          let newData = { ...data };
          newData = response.data;
          setData(newData);
          console.log(newData);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    getData();
  }, []);

  const dataMemo = useMemo(() => {
    let computedData = data;

    if (search) {
      computedData = computedData.filter(
        (theData) =>
          theData._id.toLowerCase().includes(search.toLowerCase()) ||
          theData.user.toLowerCase().includes(search.toLowerCase()) ||
          theData.createdAt.toLowerCase().includes(search.toLowerCase()) ||
          theData.text.toLowerCase().includes(search.toLowerCase()) ||
          theData.source.toLowerCase().includes(search.toLowerCase()) ||
          theData.updatedAt.toLowerCase().includes(search.toLowerCase()) ||
          theData.type.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setTotalItems(computedData.length);

    //Current Page slice
    return computedData.slice(
      (currentPage - 1) * perPagesCount,
      (currentPage - 1) * perPagesCount + perPagesCount,
    );
  }, [data, currentPage, search]);

  return (
    <>
      <div>
        <div>
          <div>
            <div>
              <Pagination
                total={totalItems}
                perPagesCount={perPagesCount}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
            <div>
              <Search
                onSearch={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <table className='table table-striped table-bordered mt-3'>
            <TableHeader
              headers={headers}
              // onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {dataMemo.map((theData) => (
                <tr>
                  <th scope='row' key={theData._id}>
                    {theData._id}
                  </th>
                  <td>{theData.user}</td>
                  <td>{theData.text}</td>
                  <td>{theData.source}</td>
                  <td>{theData.updatedAt}</td>
                  <td>{theData.type}</td>
                  <td>{theData.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DataTable;
