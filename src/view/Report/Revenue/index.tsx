import { DownloadOutlined } from "@ant-design/icons";
import listGroupPresenter from "@modules/listGroup/presenter";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import TableComponent from "@view/shared/components/TableComponent";
import useTable from "@view/shared/components/TableComponent/hook";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { customerTranslateKey } from "@view/shared/translateKey";
import { Button, Col, DatePicker, Input, Row } from "antd";
import React from "react";
import "./styles.scss";

const eye_outline = require("@assets/icon/eye-outline.png");

const Report = () => {
  const {
    STT,
    DEVICE_NAME,
    ACCOUNT,
    STATUS,
    TOTAL_DISPENSATION,
    NUMBER_OF_PLAYS,
    MUSIC,
    TOTAL_REVENUE,
    COPYRIGHT,
    RIGHT_TO_PERFORM,
    REALATED_RIGHTS,
  } = useTranslate("customerTranslateKey");

  const data = [
    {
      name: "REPORT",
    },
  ];
  const table = useTable();

  const handleSearch = (e) => {
    const value = e.target.value;
    table.fetchData({
      option: { search: value },
    });
  };

  const columnsDevices = [
    {
      title: STT,
      dataIndex: "totalUser",
      width: 100,
    },
    {
      title: MUSIC,
      dataIndex: "groupCode",
      render: (text) => text,
    },
    {
      title: TOTAL_DISPENSATION,
      dataIndex: "admin",
      render: (text, record) => record?.admin?.userName,
    },
    {
      title: TOTAL_REVENUE,
      dataIndex: "totalUser",
    },
    {
      title: COPYRIGHT,
      dataIndex: "totalDevice",
    },
    {
      title: RIGHT_TO_PERFORM,
      dataIndex: "totalDevice",
    },
    {
      title: REALATED_RIGHTS,
      dataIndex: "totalDevice",
    },
    {
      title: "VCPMC",
      dataIndex: "totalDevice",
    },
  ];

  return (
    <>
      <MainTitleComponent
        breadcrumbs={data}
        title={"LIST CUSTOMER"}
        classBreadcumb={null}
        classTitle={null}
      />
      <div className="actionHeader">
        <div className="filter">
          <p style={{ marginRight: "10px" }}>T??? ng??y</p>{" "}
          <DatePicker></DatePicker> <p>?????n ng??y</p> <DatePicker></DatePicker>
        </div>
        <div className="export">
          <Button>
            Xu???t d??? li???u <DownloadOutlined />
          </Button>
        </div>
      </div>
      <Row gutter={[50, 50]}>
        <Col span={4}>
          <div>
            <div className="inforContract">
              <h4>Th??ng tin h???p ?????ng</h4>
              <div className="rowInfor">
                <p>Lo???i h???p ?????ng</p>
                <strong>H???p ?????ng tr???n g??i</strong>
              </div>
              <div className="rowInfor">
                <p>Gi?? tr??? h???p ?????ng</p>
                <strong>365.000.000 VN??</strong>
              </div>
              <div className="rowInfor">
                <p>Gi?? tr??? ph??n ph???i/ng??y</p>
                <strong>1.000.000 VN??</strong>
              </div>
              <div className="rowInfor">
                <p>Th???i h???n h???p ?????ng</p>
                <div className="d-flex align-center inforDate">
                  <p>T???</p> <strong>01/01/2020</strong>
                </div>
                <div className="d-flex align-center inforDate">
                  <p>T???</p> <strong>01/01/2020</strong>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={20}>
          <div>
            <TableComponent
              register={table}
              apiServices={listGroupPresenter.getInfor}
              columns={columnsDevices}
              // rowSelection={rowSelection}
              // rowKey={"groupId"}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Report;
