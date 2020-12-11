class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOperator: "",
			numsToUse: [],
			currentNum: [],
			negative: false
		};
		this.keyHandler = this.keyHandler.bind(this);
		this.numPush = this.numPush.bind(this);
		this.clearAll = this.clearAll.bind(this);
		this.clearCurrent = this.clearCurrent.bind(this);
		this.backspace = this.backspace.bind(this);
		this.operatorAction = this.operatorAction.bind(this);
		this.negativeToggle = this.negativeToggle.bind(this);
		this.resultRun = this.resultRun.bind(this);
	}

	//Methods
	keyHandler(event) {
		if (/[\d.]/.test(event.key)) {
			this.numPush(event.key);
		} else if (/[=+\-*/]/.test(event.key)) {
			this.operatorAction(event.key);
		} else if (event.key == "Enter") {
			this.operatorAction("=");
		} else if (event.key == "Backspace") {
			this.backspace();
		}
	}

	numPush(event) {
		function numFeeder(value) {
			if (this.state.selectedOperator == "=") {
				this.clearAll();
			}

			if (value == ".") {
				if (this.state.currentNum.includes(".") == false) {
					this.setState((state) => state.currentNum.push(value));
				}
			} else if (value == 0) {
				if (this.state.currentNum[0] != 0 && this.state.currentNum.length > 0) {
					this.setState((state) => state.currentNum.push(value));
				}
			} else {
				this.setState((state) => state.currentNum.push(value));
			}
		}

		numFeeder = numFeeder.bind(this);

		if (event.target == undefined) {
			numFeeder(event);
		} else {
			numFeeder(event.target.value);
		}
	}

	clearAll() {
		this.setState({
			selectedOperator: "",
			numsToUse: [],
			currentNum: [],
			negative: false
		});
	}

	clearCurrent() {
		this.setState({
			currentNum: [],
			negative: false
		});
	}

	backspace() {
		this.setState((state) => state.currentNum.pop());
	}

	operatorAction(event) {
		function opFeeder(value) {
			if (this.state.selectedOperator == "=") {
				this.setState((state) => {
					state.numsToUse.push(parseFloat(state.currentNum.join("")), value);
					state.currentNum = [];
					state.selectedOperator = value;
				});
			} else {
				this.setState((state) => {
					if (isNaN(parseFloat(state.currentNum.join(""))) == false) {
						state.negative
							? state.numsToUse.push(parseFloat(state.currentNum.join("")) * -1, value)
							: state.numsToUse.push(parseFloat(state.currentNum.join("")), value);
					}
					if (value == "=") {
						this.resultRun();
						this.setState((state) => {
							state.selectedOperator = "=";
							state.numsToUse = [];
						});
					} else {
						state.selectedOperator = value;
					}
				});
				if (value == "=") {
				} else {
					this.clearCurrent();
				}
			}
		}

		opFeeder = opFeeder.bind(this);

		if (event.target == undefined) {
			opFeeder(event);
		} else {
			opFeeder(event.target.value);
		}
	}

	negativeToggle() {
		if (this.state.selectedOperator != "=") {
			this.state.negative
				? this.setState({ negative: false })
				: this.setState({ negative: true });
		}
	}

	resultRun() {
		let nums = this.state.numsToUse;

		if (/\D/.test(nums[nums.length - 1])) {
			nums.pop();
		}

		while (nums.includes("-")) {
			let index = nums.findIndex((a) => a == "-");
			nums.splice(index, 2, nums[index + 1] * -1);
		}
		while (nums.includes("/")) {
			let index = nums.findIndex((a) => a == "/");
			nums.splice(index - 1, 3, nums[index - 1] / nums[index + 1]);
		}
		while (nums.includes("*")) {
			let index = nums.findIndex((a) => a == "*");
			nums.splice(index - 1, 3, nums[index - 1] * nums[index + 1]);
		}
		while (nums.includes("+")) {
			let index = nums.findIndex((a) => a == "+");
			console.log(index);
			nums.splice(index - 1, 3, nums[index - 1] + nums[index + 1]);
		}
		if (nums.length >= 2) {
			nums = [nums.reduce((a, b) => a + b)];
		}
		this.clearCurrent();
		this.setState({ currentNum: [...nums] });
	}

	//Render
	render() {
		return (
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr 1fr 1fr",
					gridTemplateRows: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
					columnGap: "3px",
					rowGap: "3px"
				}}
				tabIndex={0}
				onKeyDown={this.keyHandler}
			>
				<Screen
					negative={this.state.negative}
					current={this.state.currentNum.join("")}
					history={this.state.numsToUse}
				/>
				<Deleters
					clear={this.clearAll}
					ce={this.clearCurrent}
					del={this.backspace}
				/>
				<Numbers numPush={this.numPush} toggle={this.negativeToggle} />
				<Operators action={this.operatorAction} equals={this.resultRun} />
			</div>
		);
	}
}

class Screen extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div
				style={{
					gridArea: "1/1/span 2/span 4",
					display: "flex",
					justifyContent: "space-between",
					overflowX: "auto",
					paddingLeft: "3px",
					paddingRight: "3px"
				}}
				id="display"
			>
				<h2>{this.props.history}</h2>
				<h1>
					{this.props.negative ? "-" : ""}
					{this.props.current.length == 0 ? 0 : this.props.current}
				</h1>
			</div>
		);
	}
}

class Deleters extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div
				style={{
					gridArea: "3/1/span 1/span 3",
					display: "flex",
					flexDirection: "rows",
					columnGap: "3px"
				}}
			>
				<button class="deleterButton" id="clearEntry" onClick={this.props.ce}>
					CE
				</button>
				<button class="deleterButton" id="clear" onClick={this.props.clear}>
					C
				</button>
				<button class="deleterButton" id="backSpace" onClick={this.props.del}>
					Del
				</button>
			</div>
		);
	}
}

class Numbers extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div
				style={{
					gridArea: "4/1/span 4/span 3",
					display: "grid",
					gridTemplateColumns: "1fr 1fr 1fr",
					columnGap: "3px",
					rowGap: "3px"
				}}
			>
				<button class="numButton" id="seven" value={7} onClick={this.props.numPush}>
					7
				</button>
				<button class="numButton" id="eight" value={8} onClick={this.props.numPush}>
					8
				</button>
				<button class="numButton" id="nine" value={9} onClick={this.props.numPush}>
					9
				</button>
				<button class="numButton" id="four" value={4} onClick={this.props.numPush}>
					4
				</button>
				<button class="numButton" id="five" value={5} onClick={this.props.numPush}>
					5
				</button>
				<button class="numButton" id="six" value={6} onClick={this.props.numPush}>
					6
				</button>
				<button class="numButton" id="one" value={1} onClick={this.props.numPush}>
					1
				</button>
				<button class="numButton" id="two" value={2} onClick={this.props.numPush}>
					2
				</button>
				<button class="numButton" id="three" value={3} onClick={this.props.numPush}>
					3
				</button>
				<button class="numButton" id="negativeButton" onClick={this.props.toggle}>
					+-
				</button>
				<button class="numButton" id="zero" value={0} onClick={this.props.numPush}>
					0
				</button>
				<button
					class="numButton"
					id="decimal"
					value={"."}
					onClick={this.props.numPush}
				>
					.
				</button>
			</div>
		);
	}
}

class Operators extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div
				style={{
					gridArea: "3 / 4 / span 5 / span 1",
					display: "flex",
					flexDirection: "column",
					rowGap: "3px"
				}}
			>
				<button class="opButton" id="add" value={"+"} onClick={this.props.action}>
					+
				</button>
				<button
					class="opButton"
					id="subtract"
					value={"-"}
					onClick={this.props.action}
				>
					-
				</button>
				<button
					class="opButton"
					id="multiply"
					value={"*"}
					onClick={this.props.action}
				>
					×
				</button>
				<button
					class="opButton"
					id="divide"
					value={"/"}
					onClick={this.props.action}
				>
					÷
				</button>
				<button
					class="opButton"
					id="equals"
					value={"="}
					onClick={this.props.action}
				>
					=
				</button>
			</div>
		);
	}
}

ReactDOM.render(<Calculator />, document.getElementById("container"));
