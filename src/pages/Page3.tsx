import React, { useState } from 'react';
import {
    ColumnHeightOutlined, DeleteOutlined, DownloadOutlined,
    DownOutlined, EditOutlined, EyeOutlined, FormatPainterOutlined, LineChartOutlined,
    MenuOutlined, MoreOutlined,
    ReloadOutlined,
    SearchOutlined, SwapOutlined,
    UploadOutlined,
    UpOutlined
} from '@ant-design/icons';
import {
    Alert,
    Button,
    Col,
    Form,
    Input,
    Modal,
    Pagination,
    Popconfirm,
    Row,
    Select,
    Space,
    Table,
    theme,
    Upload
} from 'antd';
import { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";

const { Option } = Select;


const AdvancedSearchForm = () => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [expand, setExpand] = useState(false);

    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
        marginBottom: '20px'

    };

    const getFields = () => {
        const count = expand ? 10 : 3;
        const children = [];
        for (let i = 0; i < count; i++) {
            children.push(
                <Col span={6} key={i}>
                    <Form.Item
                        name={`field-${i}`}
                        label={`Field ${i}`}
                        rules={[
                            {
                                required: true,
                                message: 'Input something!',
                            },
                        ]}
                    >
                        {i % 3 !== 1 ? (
                            <Input placeholder="placeholder" />
                        ) : (
                            <Select defaultValue="2">
                                <Option value="1">1</Option>
                                <Option value="2">
                                    longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong
                                </Option>
                            </Select>
                        )}
                    </Form.Item>
                </Col>,
            );
        }
        return children;
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
            <Row gutter={24}>

                {getFields()}

                <Col span={expand ? '12' : 6} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        {'search'}
                    </Button>
                    <Button
                        style={{ margin: '0 8px' }}
                        onClick={() => {
                            form.resetFields();
                        }}
                    >
                        {'re-setting'}
                    </Button>
                    <a
                        style={{ fontSize: 12 }}
                        onClick={() => {
                            setExpand(!expand);
                        }}
                    >
                        {expand ?
                            <> <UpOutlined /> {'view_less'} </> : <><DownOutlined /> {'view_more'}</>}
                    </a>
                </Col>
            </Row>
        </Form>
    );
};

const Page3: React.FC = () => {
    const dataSource = [
        {
            key: '1',
            name: 'ryan',
            age: 32,
            address: 'hn',
        },
        {
            key: '2',
            name: 'jack',
            age: 42,
            address: 'hcm',
        },
    ];

    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
            fixed: 'right',
            width: 250,
            render: () => {

                return (
                    <Space>
                        <a><EyeOutlined /> {'check'}</a>
                        <a><EditOutlined /> {'editor'}</a>
                        <a style={{ color: "#ed4014" }}><DeleteOutlined /> {'delete'}</a>
                        <a> {'view_more'} <DownOutlined style={{ fontSize: "10px" }} /></a>
                    </Space>
                )
            }
        },
    ];


    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectCount, setSelectCount] = useState(0);

    const selectNone = () => {
        setSelectedRowKeys([]);
        setSelectCount(0);
    };

    // rowSelection object indicates the need for row selection
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRowKeys([...selectedRowKeys]);
            setSelectCount(selectedRows.length);
        },
        getCheckboxProps: (record: any) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    // rowSelection.

    return (
        <div>
            <AdvancedSearchForm />

            <Modal title="Basic Modal"
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                width={"60%"}>
                <AdvancedSearchForm />
            </Modal>

            <Space style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>

                <Space align={"center"}>

                    <Button type="primary" onClick={() => {
                        setIsModalOpen(!isModalOpen)
                    }}>{'add_new'}</Button>

                    {selectCount > 0 &&
                        <div style={{ border: "1px solid #abdcff", borderRadius: "6px", padding: "0 10px", margin: "-1px", background: "#f0faff" }}>
                            <Space>
                                <div>
                                    {'selected'} {selectCount} {'item'}
                                </div>

                                <Button type="link" danger>
                                    <DeleteOutlined />{'remove_all'}
                                </Button>

                                <Button type="link" onClick={selectNone}>{'cancel'}</Button>
                            </Space>
                        </div>
                    }


                </Space>

                <Space align={"center"} size={"middle"}>
                    <ReloadOutlined />
                    <DownloadOutlined />
                    <ColumnHeightOutlined />
                    <FormatPainterOutlined />
                    <SwapOutlined />
                </Space>

            </Space>

            <Table dataSource={dataSource} columns={columns as ColumnsType}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                } as TableRowSelection<any>}

                pagination={
                    {
                        showQuickJumper: true,
                        defaultCurrent: 2,
                        total: 500,
                        showTotal: (total) => `Total ${total} items`,
                        // onChange={onChange}
                    }
                }
            />
        </div>
    )
}
export default Page3