import React, {useEffect, useState} from 'react';
import {Button, Form, Input, message, Select, Upload} from "antd";
import {CardTemp} from "../../hoc/CardTemp";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import {useSelector} from "react-redux";
import {getAllStoresInServer} from "../../controller/transactions/StoreTransactions";
import {addCategoryForServer, getAllCategoriesInServer} from "../../controller/transactions/CategoryTransaction";
import {responseDone} from "../../controller/ServerErrorHandling";

function Categories(props) {
    const [form] = Form.useForm();
    const [isLoading, setLoading] = useState(false)
    const [imageUploaded, setImageUploaded] = useState([]);
    const {stores, categories} = useSelector((state) => state.mainReducer) ?? [];
    useEffect(() => {
        getAllStoresInServer();
        if (categories?.length === undefined || categories?.length < 1) {
            getAllCategoriesInServer();
        }
    }, [])
    const uploadArgs = {
        beforeUpload: file => {
            return file?.type === 'image/png' || file?.type === 'image/jpg' || file?.type === 'image/jpeg' ? false : Upload.LIST_IGNORE;
        },
        onChange: info => {
            const fileType = info?.file?.type;
            if (fileType === 'image/png' || fileType === 'image/jpg' || fileType === 'image/jpeg') {
                message.success(`${info?.file?.name} is valid`);
            } else {
                message.error(`${fileType} is not a png | jpg | jpeg file`);

            }
            setImageUploaded(info.fileList)


        },
    };
    const onFinish = async (values) => {
        try {
            if (imageUploaded?.length > 0) {

                setLoading(true);
                let formData = new FormData();
                formData.set('name', values?.name);
                formData.set('file', imageUploaded[0].originFileObj);


                let result = await addCategoryForServer(formData, values?.storeId);

                if (result === responseDone) {
                    message.success(`adding successfully`);
                    form.resetFields();
                    setImageUploaded([]);
                } else {

                    message.error(`something is wrong!`);

                }
                setLoading(false);

            } else {
                message.error(`please select image`);

            }

        } catch (e) {
            console.log(e)
            setLoading(false);


        }
    }
    let listCategoriesTable = [];
    let listSelectStore = [];

    const addCategoriesAndStoreToList = () => {
        let order = 1;
        try {
            categories?.forEach((e, index) => {

                listCategoriesTable.push(
                    <tr key={index}>
                        <td>{order++}</td>
                        <td>{e?.Name}</td>
                        <td>{e?.StoreName}</td>

                        <td className="text-center">
                            <img src={`${e?.ImageUrl}?height=80&width=80`} style={{objectFit: "fill"}}
                                 placeholder={"logo"}/>
                        </td>

                    </tr>
                )
            });
            stores?.forEach((e, index) => {
                listSelectStore.push(
                    <Select.Option value={e?.Id}>{e?.Name}</Select.Option>
                )
            })
        } catch (e) {

        }
    }
    addCategoriesAndStoreToList();
    return (
        <CardTemp title={"Categories"}>
            <div className="row">
                <div className="col-lg-4 col-sm-4">
                    <Form
                        form={form}
                        name="control-hooks"
                        wrapperCol={{
                            span: 24,
                        }}
                        layout="vertical"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}

                        autoComplete="off"
                        onDragEnter={() => {
                        }}
                    >
                        <Form.Item
                            name="name"
                            label={"Name"}

                            rules={[
                                {
                                    required: true,
                                    message: 'Please inter name!',
                                },
                            ]}
                        >
                            <Input placeholder={"Name"} className="p-2 rounded"
                                   onKeyDown={(e) => e.keyCode === 13 ? e.preventDefault() : ''}/>
                        </Form.Item>

                        <Form.Item
                            name="storeId"
                            label={"Store"}
                            initialValue={""}

                            rules={[
                                {
                                    required: true,
                                    message: 'please select Store',
                                },
                            ]}
                        >
                            <Select placeholder="Store" className="reportFdropStyle"
                                    bordered={false}>
                                {listSelectStore.length > 0 ? listSelectStore : ""}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="file"
                        >
                            <Upload {...uploadArgs} maxCount={1}>
                                <Button icon={<UploadOutlined/>} type={"dashed"} className="rounded">Upload png |
                                    jpg only</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item wrapperCol={{span: 24}}>
                            <Button type="primary" htmlType="submit" style={{
                                width: '100%',
                                borderRadius: "10px",
                                fontWeight: "bold",

                            }}
                                    loading={isLoading}>
                                submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="col-lg-8 col-sm-8">
                    <table className="table table-responsive table-bordered">

                        <thead className="bg-secondary text-white">
                        <tr>
                            <th>#</th>
                            <th>Category name</th>
                            <th>Store name</th>
                            <th>Image</th>
                        </tr>
                        </thead>
                        <tbody>
                        {

                            listCategoriesTable?.length > 0 ? listCategoriesTable : <tr>
                                <td colSpan={2}>
                                    data is't found
                                </td>
                            </tr>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </CardTemp>
    );
}


export default Categories;