import { IUser } from "@/interfaces/user/users.interface";
import { Col, Input, Row } from "antd";
import { FC, useEffect, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";

const { Search: AntdSearch } = Input;

interface Props {
  data: IUser[];
  onSearch: (searchedData: IUser[]) => void;
}

const Search: FC<Props> = ({ data, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
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
