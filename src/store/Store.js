import { observable, action } from "mobx";

export default class Store {
  @observable
  dataList = [
    {
      key: "1",
      name: "Jin",
      condition: "True",
      email: "Jin.@mail.ru",
      address: [
        "Jin.@mail.ru",
        "Jin.@mail.rb",
        "3534Jin.@mail.com"
      ]
    },
    {
      key: "2",
      name: "Jon",
      condition: "False",
      email: "Jon.@mail.ru",
      address: [
        "Jon.@mail.ru",
        "RaJond121.@mail.rb",
        "3534Jond.@mail.com"
      ]
    },
    {
      key: "3",
      name: "Joy",
      condition: "True",
      email: "Joy.@mail.ru",
      address: [
        "Joy.@mail.ru",
        "Joyld121.@mail.rb",
        "3534Joy.@mail.com"
      ]
    },
    {
      key: "4",
      name: "Jim",
      condition: "False",
      email: "Jim.@mail.ru",
      address: [
        "Jim.@mail.ru",
        "Jimld121.@mail.rb",
        "3534Jim.@mail.com"
      ]
    },
    {
      key: "5",
      name: "Joly",
      condition: "True",
      email: "Joly.@mail.ru",
      address: [
        "Joly.@mail.ru",
        "Jolyd121.@mail.rb",
        "3534RJoly.@mail.com"
      ]
    },
    {
      key: "6",
      name: "Nom",
      condition: "True",
      email: "Nom.@mail.ru",
      address: [
        "Nom.@mail.ru",
        "Nomd121.@mail.rb",
        "3534RNom.@mail.com"
      ]
    },
    {
      key: "7",
      name: "Ronald",
      condition: "True",
      email: "Ronald.@mail.ru",
      address: [
        "Ronald.@mail.ru",
        "RaRonald121.@mail.rb",
        "3534Ronald.@mail.com"
      ]
    },
    {
      key: "8",
      name: "Cole",
      condition: "True",
      email: "Cole.@mail.ru",
      address: [
        "Cole.@mail.ru",
        "RaCole121.@mail.rb",
        "3534Cole.@mail.com"
      ]
    },
    {
      key: "9",
      name: "Rass",
      condition: "True",
      email: "Rass.@mail.ru",
      address: [
        "Rass.@mail.ru",
        "Rass121.@mail.ru",
        "3534Rass.@mail.ru"
      ]
    },
    {
      key: "10",
      name: "Dany",
      condition: "True",
      email: "Dany@mail.ru",
      address: [
        "Dany@mail.ru",
        "1122Dany@mail.rb",
        "232Dany@mail.com"
      ]
    }
  ];
  @observable editingKey = "";
  @observable selectedRowKeys = [];

  @action
  delete(key) {
    const index = this.dataList.findIndex(item => key === item.key);
    if (index > -1) {
      this.dataList.splice(index, 1);
    }
  }
  //checkbox
  @action
  complete(selectedRowKeys) {
    this.selectedRowKeys = selectedRowKeys;
    for (let selectedKey of this.selectedRowKeys) {
      const index = this.dataList.findIndex(item => selectedKey === item.key);
      if (index > -1) {
        this.dataList[index].complete = !this.dataList[index].complete;
      }
    }
  }
}