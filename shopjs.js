let carts=document.querySelectorAll(".add-cart");
let products=[
	{
		name:'Trevita',
		tag:'Trevita',
		price:70,
		incart:0
	},
	{
		name:'Lamborgini',
		tag:'Lamborgini',
		price:200,
		incart:0
	},
	{
		name:'Buggati',
		tag:'Buggati',
		price:50,
		incart:0
	},
	{
		name:'Ferrari',
		tag:'Ferrari',
		price:170,
		incart:0
	},
	{
		name:'Pagani',
		tag:'Pagani',
		price:100,
		incart:0
	},
];
for(let i=0;i<carts.length;i++)
{
	carts[i].addEventListener("click",()=>{
		cartNumbers(products[i]);
		totalCost(products[i]);
		
	})
	
}
function onLoadCartNumbers()
{
	let productNumbers=localStorage.getItem('cartNumbers');
	
	
	if(productNumbers)
	{
		document.getElementById("showicon").innerHTML=productNumbers;
		
	}
}
function cartNumbers(product)
{
	let productNumbers=localStorage.getItem('cartNumbers');
	productNumbers=parseInt(productNumbers);
	if(productNumbers)
	{
		localStorage.setItem('cartNumbers',productNumbers+1);
		document.getElementById("showicon").innerHTML=productNumbers+1;
	}
	else
	{
		localStorage.setItem('cartNumbers',1);
		document.getElementById("showicon").textContent=1;
	}
	setItems(product);
}
function setItems(product)
{
	let cartItems=localStorage.getItem('productsIncart');
	cartItems=JSON.parse(cartItems);
	
	if(cartItems!=null)
	{
		if(cartItems[product.tag]==undefined)
		{
			cartItems={
				...cartItems,
				[product.tag]:product
			}
		}
		cartItems[product.tag].incart+=1;
	}
	else
	{
		product.incart=1;
		cartItems={
			[product.tag]:product
		}
	}
	localStorage.setItem('productsIncart',JSON.stringify(cartItems));
}
function totalCost(product)
{
	let cartCost=localStorage.getItem('totalCost');
	
	
	if(cartCost!=null)
	{
		cartCost=parseInt(cartCost);
		localStorage.setItem('totalCost',cartCost+product.price);
		
	}
	else
	{
		localStorage.setItem('totalCost',product.price);
		
	}
}
function displayCart()
{

	let cartItems=localStorage.getItem('productsIncart');
	cartItems=JSON.parse(cartItems);
	console.log(cartItems);
	var productcontainer=document.getElementById("productcontainer");
	if(cartItems&&productcontainer)
	{
		console.log("running");
		productcontainer.innerHTML="";
		Object.values(cartItems).map(item=>{
			productcontainer.innerHTML+=`
			<div id="product">
				<table class="content" align="center" cellpadding="10" cellspacing="20">
				<tr class="headshow">
					<th>Product</th>
					<th>Name</th>
					<th>Price</th>
					<th>Quantity</th>
					<th></th>
				</tr>
				<head><hr color="grey"></head>
				<tr class="bodyshow">
				<td><img class="showimage" src="${item.tag}.jpg" height="70" width="70"></td>
				<td><span class="showname">${item.name}</span></td>
				<td><span class="showprice">${item.price}</span></td>
				<td><span class="showprice">${item.incart}</span></td>
				<td><button onclick="removecart()" class="removebt">Remove</button></td>
				</tr>
				</table>
			</div>

			`
		});
			
	}
	
}
function removecart()
{
		var mydiv=document.getElementById("product");
		var parent=mydiv.parentNode;
		parent.removeChild(mydiv);
}
			
displayCart();
onLoadCartNumbers()