class MyCar:
    def __init__(self,brand):
        self.__brand = brand


car = MyCar("Tata")

print(car.__brand)

car.__brand = "Toyota"
print(car.__brand)

  