
import React from "react";
import {Link} from "react-router-dom";
import {observer} from 'mobx-react';
import { Table, Form, Tree } from "antd";

import "antd/dist/antd.css";

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

const { TreeNode } = Tree;

// @observer
// class Demo extends React.Component {
//   onSelect = (selectedKeys, info) => {
//   };

//   onCheck = (checkedKeys, info) => {
//   };

//   render() {
//     return (
//       <Tree
//         checkable
//         defaultExpandedKeys={["0-0-0", "0-0-1"]}
//         defaultSelectedKeys={["0-0-0", "0-0-1"]}
//         defaultCheckedKeys={["0-0-0", "0-0-1"]}
//         onSelect={this.onSelect}
//         onCheck={this.onCheck}
//       >
//         <TreeNode title="User 1" key="0-0">
//           <TreeNode title="parent 1" key="0-0-0">
//             <TreeNode title="Data 1.1" key="0-0-0-0" />
//             <TreeNode title="Data 2.1" key="0-0-0-1" />
//           </TreeNode>
//           <TreeNode title="parent 2" key="0-0-1">
//             <TreeNode title="Data 2.1" key="0-0-0-0" />
//             <TreeNode title="Data 2.1" key="0-0-0-1" />
//           </TreeNode>
//         </TreeNode>
//       </Tree>
//     );
//   }
// }

// export default Demo;

@observer
export class Table2 extends React.Component {
    
  constructor(props) {
    super(props);
  
    const {store}=this.props;
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
        editable: true,
        render: (text, record) => {
          return (
            <div>
                <span>
                <Link to="/2">{record.name}</Link>
                </span>
            </div>
          
          );
        }
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
        title: "Action",
        dataIndex: "action",
        width: "15%",
        render: (text, record) => {
          return (
            <div>
                <span>
                <Link to="/2">Edit</Link>
                </span>
            </div>
          );
        }
      }
    ];
  }

render() {
    const components = {
      body: {
        row: EditableFormRow
      }
    };
    
    const columns = this.columns.map(col => {
    
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex,
          dataIndex: col.dataIndex,
          title: col.title
        })
      };
    }
    );
    const {store}=this.props;

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
};

