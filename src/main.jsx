var React = require('react');
var CodeEditor = require('./codeEditor.jsx');
var TraceViewer = require('./traceViewer.jsx');
var iii = require('iii');
var scenarioChecker = require('./scenario.js');
var scenarioInvalidException=require('./ScenarioInvalidException.js');
var modelCodeInitial = {"type":"InterfaceComposite","element":[{"type":"InterfaceCompositeElement","key":"a","value":{"type":"InterfaceComposite","element":[{"type":"InterfaceCompositeElement","key":"e","value":{"type":"InterfaceAtomic","data":{"type":"DataAtomic","name":"Number"},"direction":"in"}}]}},{"type":"InterfaceCompositeElement","key":"b","value":{"type":"InterfaceComposite","element":[{"type":"InterfaceCompositeElement","key":"c","value":{"type":"InterfaceComposite","element":[{"type":"InterfaceCompositeElement","key":"d","value":{"type":"InterfaceAtomic","data":{"type":"DataAtomic","name":"Number"},"direction":"in"}}]}}]}}]};

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state={listOfAtoms:[],errorCode:"",errorSnario:"",modelCode:modelCodeInitial,modelScenario:[]};
  }

  onCodeChange(newCode) {
    this.evaluateCode(newCode);
  }

  onScenarioChange(newScenario) {
    this.evaluateScenario(newScenario);
  }

  evaluateCode(code){
    try {
      var newModelCode = iii.parser.parse(code,{startRule:"interface"});
      this.setState({errorCode:""});
      var listOfAtoms=iii.interfaces.listOfAtoms(newModelCode,"main");
      console.log("modelCode =",JSON.stringify(listOfAtoms));
      this.setState({modelCode:newModelCode});
      this.setState({listOfAtoms:listOfAtoms});

      //console.log(JSON.stringify(this.state.listOfAtoms));

    } catch (errorMessage) {
      this.setState({errorCode:errorMessage});
      console.log(errorMessage);
    }
  }

  evaluateScenario(scenario) {
    /* TODO meme esprit que evaluateCode */

    try {
      var newModelScenario =JSON.parse(scenario);
      this.setState({modelScenario:newModelScenario});
      // var listOfValues=scenarioChecker.check(this.state.modelCode,newModelScenario,"main");
      // console.log("resultat =",JSON.stringify(listOfValues));
      this.setState({errorScenario:""});
      // this.setState({listOfValues:listOfValues});


  }catch (errorMessage) {
      console.log("erreur", errorMessage);
      this.setState({errorScenario:errorMessage});


  }
}

  listOfAtoms(newModel){
    return iii.interfaces.listOfAtoms(newModel,"main");
  }



  render() {
    return (
      <div className="Main">
        <CodeEditor errorScenario={this.state.errorScenario} errorCode={this.state.errorCode} code={this.state.code} evaluateCode={this.evaluateCode.bind(this)} evaluateScenario={this.evaluateScenario.bind(this)} onCodeChange={this.onCodeChange.bind(this)} modelCode={this.state.modelCode} modelScenario={this.state.modelScenario} scenario={this.state.scenario} onScenarioChange={this.onScenarioChange.bind(this)}/>
        <TraceViewer listOfAtoms={this.state.listOfAtoms} scenario={this.state.modelScenario}/> /* TODO on doit aussi passer le scenario en prop  */
      </div>
    );
  }
}


React.render(<Main/>, document.getElementById("main"));
