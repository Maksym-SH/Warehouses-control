<template>
  <div>
    <p>
    Данное приложение было созданно для управления складами,
    товарами, потребителями.<br> Позволяет ести учёт товаров на нескольких складах:
    <ul>
      <li>
        Когда товар прибыл и уехал
      </li>
      <li>
        К какому клиенту уехал
      </li>
      <li>
        Контроль поступления платежей
      </li>
      <li>
        Перечень потребителей
      </li>
    </ul>
    </p>
    Инструкция
    <p>
      1. Чтобы сменить тему отображения "тёмная/светлая", в случае если в данный момент применена чёрная тема, нажмите на кнопку  <b-button class="button-text button-change-theme"
      variant="dark" disabled><b-icon icon="moon"></b-icon></b-button><br/>
      В случае если в данный момент применена светлая тема, нажмите кнопку <b-button class="button-text button-change-theme" variant="warning" disabled><b-icon icon="sun"></b-icon></b-button><br/>
      2. Страница "Склады" отображает все ваши склады, который на данный момент присутствуют,
      имеется возможно добавлять, редактировать склад, изменять либо удалять товар каждого склада.<br>
      Для добавления нового склада, нажмите на кнопку <b-button variant="success" disabled><b-icon icon="plus"></b-icon></b-button><br> Введие данные склада специальном окне и нажмите на кнопку <b-button variant="primary" disabled>OK</b-button><br>
      Для того чтобы добавить товары при создании или изменении склада нажмите на кнопку  <b-button
          variant="success" class="button-text"><b-icon icon="plus"></b-icon>добавить содержание</b-button><br/>
      Чтобы изменить товар выбранного склада, нажмите на <br/> кнопку <b-button variant="primary"><b-icon icon="brush"></b-icon></b-button><br/>
      Введите новые данные товара и нажмите кнопку <b-button variant="primary" disabled>OK</b-button>
      В случае, если вы ходите удалить товар, нажмите<br/> кнопку <b-button variant="danger" class="button-text">Удалить товар</b-button><br/>
      Для редактирования склада, на нужном складе нажмите кнопку <b-button variant="success" disabled><b-icon icon="brush"></b-icon></b-button><br/>
      После любых изменений не забудьте сохранить ваши изменения нажав кнопку <b-button variant="primary" disabled>OK</b-button><br/>
      Для удаления склада, нажмите кнопку <b-button variant="danger" disabled><b-icon icon="x-circle"></b-icon></b-button><br/>
      3. Страница "Клиенты" отображает всех клиентов складов, которые на данный момент присутствуют, отображаются они в специальной таблице.<br/>
      Для добавления нового клиента, нажмите на кнопку <b-button variant="success" disabled><b-icon icon="plus"></b-icon></b-button><br> Введите данные клиента, специальном окне и нажмите<br/> кнопку <b-button variant="primary" disabled>OK</b-button><br>
      Клиент появится в таблице всех клиентов.<br/>
      Для удаления клиента нажмите на кнопку <b-button variant="danger" disabled><b-icon icon="x-circle"></b-icon></b-button><br/>
      Введите идентификатор клиента в специальном окне и нажмите кнопку <b-button variant="primary" disabled>OK</b-button><br>
      4. Страница "Выдача товара" отображает квитанции - историю покупок, место отправлений, покупателей<br/>
      Для добавления новой квитанции нажмите кнопку <b-button variant="success" disabled><b-icon icon="plus"></b-icon></b-button><br>
      Введите данные квитанции в специальном окне и нажмите кнопку <b-button variant="primary" disabled>OK</b-button><br>
      Для печати необходимой квитанции, нажмите на <br/>  кнопку  <b-button variant="warning" disabled><b-icon icon="file-earmark-break"></b-icon></b-button><br/>
      Введите идентификатор квитанции(она отображается в таблице) в специальном окне и нажмите кнопку <b-button variant="primary" disabled>OK</b-button><br/>
      Появится страница с данными выбранной квитанции, для печати страницы, нужно нажать кнопку <b-button variant="success" class="button-text" disabled>Напечатать</b-button><br/>
      После чего появится окно с параметрами для печати<br/>
      Чтобы вернуться на главную страницу нажмите <br/> кнопку <b-button variant="primary" class="button-text" disabled>Вернуться</b-button><br/>
      5. Страница "История транкзаций" отображает историю поступления платежей от потребителей, каждый раз, когда создается новая заява на выдачу товара, на данной странице автоматически добавляется один новый платеж.
    </p>
  </div>
</template>

<script>
export default {
  name:'textInstruction'
}
</script>
<style lang="scss" scoped>
  p{
    width: 100%;
    ul{
      display: block;
      padding-left: 20px;
    }
  }
  .button-text{
    width: auto;
    font-size: 12px;
    padding: 2px;
  }
  .button-change-theme{
    width: 50px;
  }
  button{
    padding: 0;
    width: 30px;
    height: 30px;
  }
</style>