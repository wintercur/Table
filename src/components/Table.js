import React from "react";
import { Link } from "react-router-dom";
import { observer } from 'mobx-react';
import { Table, Input, Popconfirm, Form, Select } from "antd";
import { Divider } from 'antd';

import "antd/dist/antd.css";

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
@observer
class EditableCell extends React.Component {
  getInput = record => {

    if (this.props.inputType === "condition") {
      const Option = Select.Option;
      return (
        <Select >
          <Option value="True">True</Option>
          <Option value="False">False</Option>
        </Select>
      );
    }
    if (this.props.inputType === "email") {
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `Please Input ${title}!`
                      }
                    ],
                    initialValue: dataIndex === 'email' ? (record[dataIndex]) : record[dataIndex]
                  })(this.getInput(record))}
                </FormItem>
              ) : (
                  restProps.children
                )}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

@observer
export class EditableTable extends React.Component {
  constructor(props) {
    super(props);

    const { store } = this.props;
    const data = store.dataList;
    this.state = { data, editingKey: "" };
    this.columns = [
      {
        title: "ID",
        dataIndex: "key",
        width: "10%",
        editable: false
      },
      {
        title: "Name",
        dataIndex: "name",
        width: "15%",
        editable: true
      },
      {
        title: "Condition",
        dataIndex: "condition",
        width: "10%",
        editable: true
      },
      {
        title: "Email",
        dataIndex: "email",
        width: "25%",
        editable: true
      },
      {
        title: "Address",
        dataIndex: "address",
        width: "25%",
        editable: true,
        render: (data) => {
          const elements = data.map((record, text) => (
            <li>{record}</li>
          ));
          return <ul>{elements}</ul>;
        }
      },
      {
        title: "Go",
        render: (text, record) => {
          return (
            <div>
              <span>
                <Link to="/">Page1</Link>
              </span>
            </div>
          );
        }
      },
      {
        title: "Action",
        dataIndex: "action",
        width: "15%",
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >Save</a>

                    )}
                  </EditableContext.Consumer>

                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>

              ) : (
                  <span>
                    <a onClick={() => this.edit(record.key)}>Edit</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.delete(record.key)}>Delete</a>
                  </span>
                )}
            </div>
          );
        }
      }
    ];
  }

  isEditing = record => {
    return record.key === this.state.editingKey;
  };

  edit(key) {
    this.setState({ editingKey: key });

  }
  delete(key) {
    this.props.store.delete(key);
  }
  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      console.log(form.getFieldValue('email'));

      row = {
        ...row,
        'email': row['email'],
      };
      const newEmail = [...this.state.data];

      const index = newEmail.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newEmail[index];
        newEmail.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ data: newEmail, editingKey: "" });
        this.props.store.dataList = newEmail;

      } else {
        newEmail.push(row);
        this.setState({ data: newEmail, editingKey: "" });
      }
    });
  }

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });
    const { store } = this.props;

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {

        store.complete(selectedRowKeys);
      },
      selectedRowKeys: store.selectedRowKeys,
    };
    return (
      <Table
        rowSelection={rowSelection}
        components={components}
        bordered
        dataSource={store.dataList.toJS()}
        columns={columns}
        rowClassName="editable-row"
      />
    );
  }
}

export default EditableTable;
