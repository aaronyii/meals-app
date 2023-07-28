import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // useEffect should not have function that return promise
  // Solution: create an async function within the useEffect hook
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://aaron123.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something wrong with the http request!");
      }
      const data = await response.json();

      const loadedData = [];
      for (let key in data) {
        loadedData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        });
      }

      setMeals(loadedData);
      setIsLoading(false);
    }
  // Problem: Since throwing an error within the same function that generate promise would
  //          make it being rejected, we can't use try-catch block here
  // Solution: instead we use catch function followed by the fetchData function call
      fetchData().catch(error => {
        setIsLoading(false)
        setHttpError(error.message)
    })
  }, []);

  if (isLoading) {
    return <section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section>
  }

  if (httpError) {
    return <section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
