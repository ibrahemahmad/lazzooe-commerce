import React, {useEffect, useState} from 'react';
import {CardTemp} from "../../hoc/CardTemp";
import {Button, Form, Input, message, Upload} from "antd";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import {useSelector} from "react-redux";
import {addStoresForServer, getAllStoresInServer} from "../../controller/transactions/StoreTransactions";
import {responseDone} from "../../controller/ServerErrorHandling";
// for (var key of formData.entries()) {
//     console.log(key[0] + ', ' + key[1]);
// }
function Stores(props) {
    const [form] = Form.useForm();
    const [isLoading, setLoading] = useState(false)
    const {stores} = useSelector((state) => state.mainReducer) ?? [];
    const [imageUploaded, setImageUploaded] = useState([]);
    useEffect(() => {
        //if empty get data.
        if (stores?.length === undefined || stores?.length < 1) {
            getAllStoresInServer();
        }
    }, [])
    //upload args
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
    //form submet
    const onFinish = async (values) => {

        try {
            if (imageUploaded?.length > 0) {

                setLoading(true);
                let formData = new FormData();
                formData.set('name', values?.name);
                formData.set('owner', values?.owner);
                formData.set('ownerPhone', values?.ownerPhone);
                formData.set('address', values?.address);
                formData.set('file', imageUploaded[0].originFileObj);
                // for (var key of formData.entries()) {
                //     console.log(key[0] + ', ' + key[1]);
                // }

                let result = await addStoresForServer(formData);

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
    const listTableData = [];
    //add store data into table

    const addStoresToTable = () => {
        let counter = 1;
        try {
            if (stores?.length > 0) {
                stores?.forEach((e, index) => {

                    listTableData.push(
                        <tr key={index}>
                            <td>
                                {counter++}
                            </td>
                            <td>
                                {e?.Name}
                            </td>
                            <td>
                                {e?.Owner}
                            </td>
                            <td>
                                {e?.OwnerPhone}
                            </td>
                            <td>
                                {e?.address}
                            </td>
                            <td className={"text-center"}>
                                <img src={`${e?.LogoUrl}?height=80&width=80`} style={{objectFit: "fill"}}
                                     placeholder={"logo"}/>
                            </td>

                        </tr>)
                });
            }

        } catch (e) {

        }


    }
    addStoresToTable();
    try {
        return (

            <CardTemp title={"Stores"}>
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

                                name="owner"
                                label={"Owner"}
                                initialValue={""}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please inter Owner name!',
                                    },
                                ]}

                            >
                                <Input placeholder={"Owner"} className="p-2 rounded"
                                       onKeyDown={(e) => e.keyCode === 13 ? e.preventDefault() : ''}/>
                            </Form.Item>
                            <Form.Item

                                name="ownerPhone"
                                label={"Owner-phone"}
                                initialValue={""}
                                rules={[
                                    {
                                        pattern: new RegExp(/^[0-9]+$/),
                                        message: 'only number allowed!',

                                    },
                                ]}

                            >
                                <Input placeholder={"Owner-phone"} className="p-2 rounded"
                                       onKeyDown={(e) => e.keyCode === 13 ? e.preventDefault() : ''}/>
                            </Form.Item>
                            <Form.Item

                                name="address"
                                label={"Address"}
                                initialValue={""}
                            >
                                <Input placeholder={"Address"} className="p-2 rounded"
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
                    <div className="col-lg-8 col-sm-8">
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

                                listTableData?.length > 0 ? listTableData : <tr>
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
    } catch (e) {
        return (
            <div>
                Something is wrong
            </div>
        )
    }
}

export default Stores;