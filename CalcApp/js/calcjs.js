
var challangecalcApp = angular.module('challangecalcApp', []);


challangecalcApp.directive("bnDocumentKeypress", function( $document, $parse ){
                var linkFunction = function( $scope, $element, $attributes ){
                    var scopeExpression = $attributes.bnDocumentKeypress;
                        var invoker = $parse( scopeExpression );
                            $document.on("keyup", function( event ){
                            $scope.$apply(function(){
                                    invoker($scope,
                                        {
                                            $event: event
                                        }
                                    );
 
                                }
                            );
 
                        }
                    );
 
                };
 
                return( linkFunction );
            }
        );
challangecalcApp.controller("ChallangecalcController", function ($scope) {

    
    $scope.output = "0";
    $scope.newNumber = true;
    $scope.pendingOperation = null;
    $scope.operationToken = "";
    $scope.runningTotal = null;
    $scope.pendingValue = null;
    $scope.lastOperation = null;


    var ADD = "adding";
    var SUBTRACT = "subtracting";
    var DIVIDE = "dividing";
    var MULTIPLY = "multipling"
    var ADD_TOKEN = "+";
    var SUBTRACT_TOKEN = "-";
    var DIVIDE_TOKEN = "/";
    var MULTIPLY_TOKEN = "*";


    $scope.updateOutput = function (btn) {
        if ($scope.output == "0" || $scope.newNumber) {
            $scope.output = btn;
            $scope.newNumber = false;
        } else {
            $scope.output += String(btn);
        }
        $scope.pendingValue = toNumber($scope.output);
    };
    
    $scope.updateOutNeg = function () {
        $scope.pendingValue = toNegativeNumber($scope.output);
        toString($scope.pendingValue);
        $scope.output = $scope.pendingValue;
    };

    $scope.add = function () {
        if ($scope.pendingValue) {
            if ($scope.runningTotal && $scope.pendingOperation == ADD) {
                $scope.runningTotal += $scope.pendingValue;
            } else if ($scope.runningTotal && $scope.pendingOperation == SUBTRACT) {
                $scope.runningTotal -= $scope.pendingValue;
            } else if ($scope.runningTotal && $scope.pendingOperation == DIVIDE) {
                $scope.runningTotal /= $scope.pendingValue;
             } else if ($scope.runningTotal && $scope.pendingOperation == MULTIPLY) {
                $scope.runningTotal *= $scope.pendingValue;
            } else {
                $scope.runningTotal = $scope.pendingValue;
            }
        }
        setOperationToken(ADD);
        setOutput(String($scope.runningTotal));
        $scope.pendingOperation = ADD;
        $scope.newNumber = true;
        $scope.pendingValue = null;
    };


    $scope.subtract = function () {
        if ($scope.pendingValue) {
            if ($scope.runningTotal && ($scope.pendingOperation == SUBTRACT)) {
                $scope.runningTotal -= $scope.pendingValue;
            } else if ($scope.runningTotal && $scope.pendingOperation == ADD) {
                $scope.runningTotal += $scope.pendingValue;
            } else if ($scope.runningTotal && $scope.pendingOperation == DIVIDE) {
                $scope.runningTotal /= $scope.pendingValue;
             } else if ($scope.runningTotal && $scope.pendingOperation == MULTIPLY) {
                $scope.runningTotal *= $scope.pendingValue;
            } else {
                $scope.runningTotal = $scope.pendingValue;
            }
        }
        setOperationToken(SUBTRACT);
        setOutput(String($scope.runningTotal));
        $scope.pendingOperation = SUBTRACT;
        $scope.newNumber = true;
        $scope.pendingValue = null;
    };
    
    $scope.divide = function () {
        if ($scope.pendingValue) {
            if ($scope.runningTotal && ($scope.pendingOperation == DIVIDE)) {
                $scope.runningTotal /= $scope.pendingValue;
            } else if ($scope.runningTotal && $scope.pendingOperation == ADD) {
                $scope.runningTotal += $scope.pendingValue;
                } else if ($scope.runningTotal && $scope.pendingOperation == SUBTRACT) {
                $scope.runningTotal -= $scope.pendingValue;
                } else if ($scope.runningTotal && $scope.pendingOperation == MULTIPLY) {
                $scope.runningTotal *= $scope.pendingValue;
            } else {
                $scope.runningTotal = $scope.pendingValue;
            }
        }
        setOperationToken(DIVIDE);
        setOutput(String($scope.runningTotal));
        $scope.pendingOperation = DIVIDE;
        $scope.newNumber = true;
        $scope.pendingValue = null;
    };
    
    $scope.multiply = function () {
        if ($scope.pendingValue) {
            if ($scope.runningTotal && ($scope.pendingOperation == MULTIPLY)) {
                $scope.runningTotal *= $scope.pendingValue;
            } else if ($scope.runningTotal && $scope.pendingOperation == ADD) {
                $scope.runningTotal += $scope.pendingValue;
                } else if ($scope.runningTotal && $scope.pendingOperation == SUBTRACT) {
                $scope.runningTotal -= $scope.pendingValue;
            } else if ($scope.runningTotal && $scope.pendingOperation == DIVIDE) {
                $scope.runningTotal /= $scope.pendingValue;
            } else {
                $scope.runningTotal = $scope.pendingValue;
            }
        }
        setOperationToken(MULTIPLY);
        setOutput(String($scope.runningTotal));
        $scope.pendingOperation = MULTIPLY;
        $scope.newNumber = true;
        $scope.pendingValue = null;
    };


    $scope.calculate = function () {
        if (!$scope.newNumber) {
            $scope.pendingValue = toNumber($scope.output);
            $scope.lastValue = $scope.pendingValue;
        }
        if ($scope.pendingOperation == ADD) {
            $scope.runningTotal += $scope.pendingValue;
            $scope.lastOperation = ADD;
        } else if ($scope.pendingOperation == SUBTRACT) {
            $scope.runningTotal -= $scope.pendingValue;
            $scope.lastOperation = SUBTRACT;
        } else if ($scope.pendingOperation == DIVIDE) {
            $scope.runningTotal /= $scope.pendingValue;
            $scope.lastOperation = DIVIDE;
        } else if ($scope.pendingOperation == MULTIPLY) {
            $scope.runningTotal *= $scope.pendingValue;
            $scope.lastOperation = MULTIPLY;
        } else {
            if ($scope.lastOperation) {
                if ($scope.lastOperation == ADD) {
                    if ($scope.runningTotal) {
                        $scope.runningTotal += $scope.lastValue;
                    } else {
                        $scope.runningTotal = 0;
                    }
                } else if ($scope.lastOperation == SUBTRACT) {
                    if ($scope.runningTotal) {
                        $scope.runningTotal -= $scope.lastValue;
                    } else {
                        $scope.runningTotal = 0;
                    }
                } else if ($scope.lastOperation == DIVIDE) {
                    if ($scope.runningTotal) {
                        $scope.runningTotal /= $scope.lastValue;
                    } else {
                        $scope.runningTotal = 0;
                    }
                } else if ($scope.lastOperation == MULTIPLY) {
                    if ($scope.runningTotal) {
                        $scope.runningTotal *= $scope.lastValue;
                    } else {
                        $scope.runningTotal = 0;
                    }
                }
            } else {
                $scope.runningTotal = 0;
            }
        }
        setOutput($scope.runningTotal);
        setOperationToken();
        $scope.pendingOperation = null;
        $scope.pendingValue = null;
    };


    $scope.clear = function () {
        $scope.runningTotal = null;
        $scope.pendingValue = null;
        $scope.pendingOperation = null;
        $scope.operationToken = "";
        setOutput("0");
    };


    setOutput = function (outputString) {
        $scope.output = outputString;
        $scope.newNumber = true;
    };

    setOperationToken = function (operation) {
        if (operation == ADD) {
            $scope.operationToken = ADD_TOKEN;
        } else if (operation == SUBTRACT) {
            $scope.operationToken = SUBTRACT_TOKEN;
        } else if (operation == DIVIDE) {
            $scope.operationToken = DIVIDE_TOKEN;
        } else if (operation == MULTIPLY) {
            $scope.operationToken = MULTIPLY_TOKEN;
        } else {
            $scope.operationToken = "";
        }
    };
/*
can this be done with angular?
*/
    toNumber = function (numString) {
        var result = 0;
        if (numString) {
            result = numString * 1;
        }
        return result;
    };
    
    toNegativeNumber = function (numString) {
        var result = 0;
        if (numberString) {
            result = numberString * -1;
        }
        return result;
    };
    
/*
This is for the key inputs. I would like to bind these to the actual ng-click,
thus when a user hits a key on the keyboard the button will also be depressed in the UI
*/
    
   $scope.handleKeypress = function( event ) {
       var code = event.which
           console.log(code); 
          if (code == 13) {
            $scope.calculate();
          }
          else if (code == 189 || code == 109) {
            $scope.subtract();
          }
        else if (code == 187 || code == 107) {
            $scope.add();
          }
       else if (code == 106) {
            $scope.multiply();
          }
       else if (code == 191 || code == 111) {
            $scope.divide();
          }
       else if (code == 49 || code == 97) {
            $scope.updateOutput(1);
          }
       else if (code == 50 || code == 98) {
            $scope.updateOutput(2);
          }
       else if (code == 51 || code == 99) {
            $scope.updateOutput(3);
          }
       else if (code == 52 || code == 100) {
            $scope.updateOutput(4);
          }
       else if (code == 53 || code == 101) {
            $scope.updateOutput(5);
          }
       else if (code == 54 || code == 102) {
            $scope.updateOutput(6);
          }
       else if (code == 55 || code == 103) {
            $scope.updateOutput(7);
          }
       else if (code == 56 || code == 104) {
            $scope.updateOutput(8);
          }
       else if (code == 57 || code == 105) {
            $scope.updateOutput(9);
          }
       else if (code == 48 || code == 96) {
            $scope.updateOutput(0);
          }
       else if (code == 110 || code == 190) {
            $scope.updateOutput('.');
          }
       else if (code == 12) {
            $scope.clear();
          }

    };
});