import React, { useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result, Select, List, Modal, Input, message } from 'antd';

const { Option } = Select;

const sampleFoods = [
  { name: 'Elma', portion: '1 orta', calories: 95 },
  { name: 'Muz', portion: '1 orta', calories: 105 },
  { name: 'Tavuk Göğsü', portion: '100g', calories: 165 },
  { name: 'Brokoli', portion: '1 kase', calories: 55 },
  { name: 'Pirinç', portion: '1 kase', calories: 206 },
  { name: 'Yumurta', portion: '1 büyük', calories: 78 },
  { name: 'Avokado', portion: '1 orta', calories: 240 },
  { name: 'Tam Buğday Ekmeği', portion: '1 dilim', calories: 69 },
  { name: 'Somon', portion: '100g', calories: 208 },
  { name: 'Yoğurt', portion: '1 kase', calories: 150 },
  { name: 'Badem', portion: '30g', calories: 172 },
  { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 119 },
  { name: 'Yulaf', portion: '1/2 kase', calories: 154 },
  { name: 'Havuç', portion: '1 orta', calories: 25 },
  { name: 'Patates', portion: '1 orta', calories: 163 },
  { name: 'Marul', portion: '1 yaprak', calories: 5 },
  { name: 'Domates', portion: '1 orta', calories: 22 },
  { name: 'Salatalık', portion: '1 orta', calories: 16 },
  { name: 'Makarna', portion: '1 kase', calories: 220 },
  { name: 'Biftek', portion: '100g', calories: 250 },
];

const Home = ({ onLogout, userInfo, dailyCalories }) => {
  const [meals, setMeals] = useState([
    { id: 1, name: 'Kahvaltı', foods: [], totalCalories: 0 },
    { id: 2, name: 'Öğle Yemeği', foods: [], totalCalories: 0 },
    { id: 3, name: 'Akşam Yemeği', foods: [], totalCalories: 0 },
  ]);

  const [selectedMealId, setSelectedMealId] = useState(meals[0].id);
  const [selectedFood, setSelectedFood] = useState(sampleFoods[0]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState('');

  const handleAddFood = () => {
    setMeals(prevMeals =>
      prevMeals.map(meal => {
        if (meal.id === selectedMealId) {
          const updatedTotalCalories = meal.totalCalories + selectedFood.calories;
          if (updatedTotalCalories <= dailyCalories / 3) {
            return {
              ...meal,
              foods: [...meal.foods, selectedFood],
              totalCalories: updatedTotalCalories,
            };
          } else {
            message.warning('Bu öğündeki kalori limiti aşıldı.');
          }
        }
        return meal;
      })
    );
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    message.success('Diyet listeniz e-posta olarak gönderildi!');
    // Burada e-posta gönderme işlevini çağırabilirsiniz
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Result
      icon={<SmileOutlined />}
      title="Bilgileriniz"
      subTitle="Detaylarınız aşağıda yer almaktadır:"
      extra={
        <div className="logout-button-container">
          <Button onClick={onLogout} type="primary">Çıkış Yap</Button>
        </div>
      }
    >
      <div className="user-info">
        <p><strong>Yaş:</strong> {userInfo.age}</p>
        <p><strong>Cinsiyet:</strong> {userInfo.gender}</p>
        <p><strong>Boy:</strong> {userInfo.height} cm</p>
        <p><strong>Kilo:</strong> {userInfo.weight} kg</p>
        <p><strong>Günlük Kalori İhtiyacı:</strong> {dailyCalories} kcal</p>
      </div>
      <div className="meal-plan">
        <h3>Kişisel Diyet Planı</h3>
        <Select
          value={selectedMealId}
          onChange={value => setSelectedMealId(value)}
          style={{ width: 120, marginRight: 10 }}
        >
          {meals.map(meal => (
            <Option key={meal.id} value={meal.id}>{meal.name}</Option>
          ))}
        </Select>
        <Select
          value={selectedFood.name}
          onChange={value => setSelectedFood(sampleFoods.find(food => food.name === value))}
          style={{ width: 200, marginRight: 10 }}
        >
          {sampleFoods.map(food => (
            <Option key={food.name} value={food.name}>
              {food.name} - {food.portion} - {food.calories} kcal
            </Option>
          ))}
        </Select>
        <Button onClick={handleAddFood} type="primary">Yiyecek Ekle</Button>
        {meals.map(meal => (
          <div key={meal.id}>
            <h4>{meal.name} (Toplam Kalori: {meal.totalCalories.toFixed(2)} kcal)</h4>
            <List
              dataSource={meal.foods}
              renderItem={food => (
                <List.Item>
                  {food.name} - {food.portion} - {food.calories} kcal
                </List.Item>
              )}
            />
          </div>
        ))}
        <Button onClick={showModal} type="primary" style={{ marginTop: 20 }}>Gönder</Button>
        <Modal
          title="Diyet Listesini Gönder"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Gönder"
          cancelText="İptal"
        >
          <Input
            placeholder="E-posta adresinizi girin"
            value={email}
            onChange={handleEmailChange}
          />
        </Modal>
      </div>
    </Result>
  );
};

export default Home;
