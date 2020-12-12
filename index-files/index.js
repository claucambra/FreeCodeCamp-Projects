function linkSwitcher(element) {
	console.log(`Switching to ${element.id}`); 
	switch(element.id) {
		//Responsive Web Design
		case "bourdain":
			window.open("https://elchupacambra.github.io/FreeCodeCamp-Projects/Responsive\ Web\ Design/Anthony\ Bourdain\ Tribute/anthony-bourdain.html");
			break;
		case "corgi":
			window.open("https://elchupacambra.github.io/FreeCodeCamp-Projects/Responsive\ Web\ Design/Corgi-Express-Shop/Corgi-Express-Shop.html");
			break;
		case "fpga":
			window.open("https://elchupacambra.github.io/FreeCodeCamp-Projects/Responsive\ Web\ Design/FPGA-Intro-Doc-Demo/FPGA-Doc.html");
			break;
		case "portfolio":
			window.open("https://elchupacambra.github.io/FreeCodeCamp-Projects/Responsive\ Web\ Design/Personal Portfolio Site/portfolio.html");
			break;
		case "feedback":
			window.open("https://elchupacambra.github.io/FreeCodeCamp-Projects/Responsive\ Web\ Design/Site\ Feedback\ Form/Site-feedback-form.html");
			break;
		//Front End Libraries
		case "clock":
			window.open("https://elchupacambra.github.io/FreeCodeCamp-Projects/Front\ End\ Libraries/25+5\ Clock/clock.html");
			break;
		case "drum":
			window.open("https://elchupacambra.github.io/FreeCodeCamp-Projects/Front\ End\ Libraries/Hyper\ Simple\ Drum\ Machine/drum.html");
			break;
		case "quote":
			window.open("https://elchupacambra.github.io/FreeCodeCamp-Projects/Front\ End\ Libraries/Random\ Quote\ Machine/quote.html");
			break;
		case "previewer":
			window.open("https://elchupacambra.github.io/FreeCodeCamp-Projects/Front\ End\ Libraries/Simple\ Markdown\ Previewer/markdown-previewer.html");
			break;
		case "calculator":
			window.open("https://elchupacambra.github.io/FreeCodeCamp-Projects/Front\ End\ Libraries/Simple\ Calculator/calculator.html");
			break;
	}
}
