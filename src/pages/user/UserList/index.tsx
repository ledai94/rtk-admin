import React, { useState } from 'react';
import {
    ColumnHeightOutlined, DeleteOutlined, DownloadOutlined,
    DownOutlined, EditOutlined, EyeOutlined, FormatPainterOutlined, LineChartOutlined,
    MenuOutlined, MoreOutlined, PlusOutlined,
    ReloadOutlined,
    SearchOutlined, SlidersOutlined, SwapOutlined,
    UploadOutlined,
    UpOutlined
} from '@ant-design/icons';
import {
    Alert,
    Button, Checkbox,
    Col, Drawer, Dropdown,
    Form,
    Input, MenuProps,
    Modal,
    Pagination,
    Popconfirm,
    Row,
    Select,
    Space,
    Table,
    theme, Tooltip,
    Upload
} from 'antd';
import { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import UserEdit from "../UserEdit";
import DictSelect from "../../../components/DictSelect";

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
                                    nglonglong
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
                            <> <UpOutlined /> {'view_less'} </> : <><DownOutlined />  {'view_more'}</>}
                    </a>
                </Col>
            </Row>
        </Form>
    );
};

const UserList: React.FC = () => {
    const dataSource = [
        {
            key: '1',
            name: 'teddy',
            age: 32,
            address: 'tn',
        },
        {
            key: '2',
            name: 'brian',
            age: 42,
            address: 'tq',
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
            title: 'action',
            dataIndex: 'name',
            key: 'name',
            fixed: 'right',
            width: 250,
            render: () => {

                return (
                    <Space>
                        <a><EyeOutlined /> {'view_detail'}</a>
                        <a><EditOutlined /> {'edit'}</a>
                        <a style={{ color: "#ed4014" }}><DeleteOutlined /> {'delete'}</a>
                        <a> {'view_more'} <DownOutlined style={{ fontSize: "10px" }} /></a>
                    </Space>
                )
            }
        },
    ];


    const densityItems: MenuProps['items'] = [
        {
            key: '1',
            label: 'default',
        },
        {
            key: '2',
            label: 'Loose',
        },
        {
            key: '3',
            label: 'compact',
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
    const [showDrawer, setShowDrawer] = useState(false);

    return (
        <div>

            <Drawer title={'setting column'} placement="right" onClose={() => setShowDrawer(false)} open={showDrawer}>
                {columns.map((item) => {
                    return <p> <Checkbox>{item.title}</Checkbox></p>
                })}
            </Drawer>

            <AdvancedSearchForm />

            <Modal title={'new_user'}
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                width={"60%"}>
                <UserEdit />
            </Modal>

            <Space style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>

                <Space align={"center"}>

                    <Button type="primary" onClick={() => {
                        setIsModalOpen(!isModalOpen)
                    }}><PlusOutlined />{'add new user'}</Button>

                    <DictSelect dictUrl={"/account/status"} style={{ width: "130px" }} />

                    {selectCount > 0 &&
                        <div style={{ border: "1px solid #abdcff", borderRadius: "6px", padding: "0 10px", margin: "-1px", background: "#f0faff" }}>
                            <Space>
                                <div>
                                    {`chosen ${selectCount} item`}
                                </div>

                                <Button type="link" danger>
                                    <DeleteOutlined />{'delete_all'}
                                </Button>

                                <Button type="link" onClick={selectNone}>{'cancel selection'}</Button>
                            </Space>
                        </div>
                    }


                </Space>

                <Space align={"center"} size={"small"}>
                    <Tooltip title={"refresh"}>
                        <Button type={"text"} icon={<ReloadOutlined />} />
                    </Tooltip>

                    <Tooltip title={"export"}>
                        <Button type={"text"} icon={<DownloadOutlined />} />
                    </Tooltip>

                    <Tooltip title={"density"}>
                        <Dropdown menu={{ items: densityItems }} placement="bottom" arrow trigger={['click']}>
                            <Button type={"text"} icon={<ColumnHeightOutlined />} />
                        </Dropdown>
                    </Tooltip>

                    <Tooltip title={'print'}>
                        <Button type={"text"} icon={<FormatPainterOutlined />} />
                    </Tooltip>

                    <Tooltip title={'column setting'}>
                        <Button type={"text"} icon={<SwapOutlined />} onClick={() => { setShowDrawer(true) }} />
                    </Tooltip>
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
export default UserList