class Item:
    def __init__(self,name,price, restorehealth):
        self.name=name
        self.restorehealth=restorehealth
        self.price=price
        self.quantity=0


item1=Item("apple", 10,10)
item2=Item("health potion", 100,100)
item3=Item("mushroom", 15,15)
item4=Item("meat", 50,50)
item5=Item("bread", 30,30)



itemsanakirja={
    item1.name:item1,
    item2.name:item2,
    item3.name:item3,
    item4.name:item4,
    item5.name:item5
}
