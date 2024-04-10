import React, { useState } from "react";
import { Col, Input, Row } from "antd";
import useDebounce from "../../../hooks/useDebounce";
import { DataType } from "@/interfaces/user/users.interface";

const { Search: AntdSearch } = Input;

interface Props {
  data: DataType[];
  onSearch: (searchedData: DataType[]) => void;
}

const Search: React.FC<Props> = ({ data, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // Apply debounce to searchTerm with a delay of 300ms
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  // Whenever debouncedSearchTerm changes, trigger the search
  React.useEffect(() => {
    const filteredData = data.filter((item) =>
      Object.values(item).some(
        (val) =>
          typeof val === "string" && val.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      ),
    );
    onSearch(filteredData);
  }, [debouncedSearchTerm, data, onSearch]);

  return (
    <Row>
      <Col span={8}>
        <AntdSearch
          placeholder='Input search'
          onChange={(e) => setSearchTerm(e.target.value)}
          enterButton
          size='large'
        />
      </Col>
      <Col span={8} offset={8}></Col>
    </Row>
  );
};

export default Search;
