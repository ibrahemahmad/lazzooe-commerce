import React, {useEffect, useState} from 'react';
import {Button, Form, Input, message, Pagination, Select, Upload} from "antd";
import {CardTemp} from "../../hoc/CardTemp";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import {addProductForServer, getProductsInServer} from "../../controller/transactions/ProductTransaction";
import {useSelector} from "react-redux";
import myApi from "../../controller/api";
import {getAllStoresInServer} from "../../controller/transactions/StoreTransactions";
import {responseDone} from "../../controller/ServerErrorHandling";

const {TextArea} = Input;

function Products(props) {
    const [form] = Form.useForm();
    const [isLoading, setLoading] = useState(false)
    const [imageUploaded, setImageUploaded] = useState([]);
    const {stores, products, totalProduct} = useSelector((state) => state.mainReducer) ?? [];
    const [listCategoriesSelector, setCategorySelector] = useState([]);
    const [currnetPage, setCurrentPage] = useState(1);
    useEffect(() => {
        getProductsInServer({startAt: 0, limit: 5});

        getAllStoresInServer();


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
                formData.set('description', values?.description);
                formData.set('price', parseFloat(values?.price));
                formData.set('file', imageUploaded[0].originFileObj);


                let result = await addProductForServer(formData, values?.storeId, values?.catId);

                if (result === responseDone) {
                    message.success(`adding successfully`);
                    setImageUploaded([]);

                    form.resetFields();
                } else {

                    message.error(`something is wrong!`);

                }
                setLoading(false);

            } else {
                message.error(`please select image`);

            }

        } catch (e) {
            setLoading(false);


        }
    }

    let listStoresSelector = [];
    let listProductTable = [];

    const addDataIntoLists = () => {
        let counts = 1;
        try {
            products?.forEach((e, index) => {
                listProductTable.push(
                    <tr key={index}>
                        <td>{counts++}</td>
                        <td>
                            {e?.Name}
                        </td>
                        <td>{e?.StoreOwner}</td>
                        <td>{e?.StoreOwnerPhone}</td>
                        <td>{e?.StoreAddress}</td>
                        <td className="text-center">
                            <img src={`${e?.ImageUrl}?height=80&width=80`} style={{objectFit: "fill"}}
                                 placeholder={"logo"}/>
                        </td>


                    </tr>
                )
            });
            stores?.forEach((e, index) => {
                listStoresSelector.push(
                    <Select.Option value={e?.Id} key={index}>{e?.Name}</Select.Option>
                )
            })


        } catch (e) {

        }

    }
    addDataIntoLists();
    const getCategoryByIdStore = async (id) => {
        setCategorySelector([])
        form.setFieldsValue({
            catId: '',

        });


        try {
            const response = await myApi.get(`/categories/${id}/categories`)
            let res = [];
            response?.data?.data?.forEach((e, index) => {
                res.push(
                    <Select.Option
                        value={e?.Id} key={index}>{e?.Name}</Select.Option>
                )

            })
            setCategorySelector(res)

        } catch (e) {
            message.error(`can't get category!`);

        }

    }
    return (
        <CardTemp title={"Products"}>
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

                            name="price"
                            label={"price"}
                            initialValue={"0"}
                            rules={[
                                {
                                    required: true,
                                    pattern: new RegExp(/^[0-9]*\.?[0-9]*$/),
                                    message: 'only number allowed!',

                                },
                            ]}

                        >
                            <Input placeholder={"price"} className="p-2 rounded"
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
                            <Select

                                placeholder="Store"
                                className="reportFdropStyle"
                                bordered={false}
                                onChange={(val) => getCategoryByIdStore(val)}


                            >
                                {listStoresSelector.length > 0 ? listStoresSelector : ""}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="catId"
                            label={"Category"}
                            initialValue={""}

                            rules={[
                                {
                                    required: true,
                                    message: 'please select Category',
                                },
                            ]}
                        >
                            <Select placeholder="Category" className="reportFdropStyle"
                                    bordered={false}>
                                {listCategoriesSelector.length > 0 ? listCategoriesSelector : ""}
                            </Select>
                        </Form.Item>
                        <Form.Item

                            name="description"
                            label={"description"}
                            initialValue={""}


                        >
                            <TextArea placeholder={"description"} className="p-2 rounded"
                                      onKeyDown={(e) => e.keyCode === 13 ? e.preventDefault() : ''}/>
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
                <div className="col-lg-8 col-sm-8 d-flex flex-column justify-content-between">
                    <table className="table table-responsive table-bordered">

                        <thead className="bg-secondary text-white">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Owner</th>
                            <th>Owner-phone</th>
                            <th>Address</th>
                            <th>Logo</th>
                        </tr>
                        </thead>
                        <tbody>
                        {

                            listProductTable?.length > 0 ? listProductTable?.slice((currnetPage * 5 - 5), (currnetPage * 5)) :
                                <tr>
                                    <td colSpan={2}>
                                        data is't found
                                    </td>
                                </tr>
                        }
                        </tbody>


                    </table>

                    <div className="d-flex justify-content-center">

                        <Pagination defaultCurrent={1} pageSize={5} total={totalProduct} showSizeChanger={false}
                                    showQuickJumper={false}

                                    onChange={(dat) => {
                                        setCurrentPage(dat)
                                        let limit = dat * 5;

                                        if (listProductTable.length >= limit) {
                                            //do nothing
                                        } else {
                                            getProductsInServer({startAt: 0, limit: limit})
                                        }

                                    }}
                        />

                    </div>
                </div>


            </div>
        </CardTemp>
    );
}


export default Products;
