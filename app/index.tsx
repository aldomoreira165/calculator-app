import { View } from 'react-native'
import React from 'react'
import { globalStyles } from '@/styles/global-styles'
import ThemeText from '@/components/ThemeText'
import CalculatorButton from '@/components/CalculatorButton'
import { Colors } from '@/constants/Colors'
import { useCalculator } from '@/hooks/useCalculator'

const CalculatorApp = () => {

  const { formula, prevNumber, buildNumber, clean, toggleSign, deleteLastDigit, divideOperation, multiplyOperation, substractOperation, addOperation, calculateResult } = useCalculator();

  return (
    <View style={globalStyles.calculatorContainer}>
      {/* Resultados */}
      <View style={{ paddingHorizontal: 30, paddingBottom: 20 }}>
        <ThemeText variant='h1'>{formula}</ThemeText>
        {
          formula === prevNumber ? (
            <ThemeText variant='h2'> </ThemeText>
          ) : (
            <ThemeText variant='h2'>{ prevNumber }</ThemeText>
          )
        }
      </View>

      {/* Filas de botones */}
      <View style={globalStyles.row}>
        <CalculatorButton
          label='C'
          blackText
          color={Colors.lightGray}
          onPress={clean}
        />

        <CalculatorButton
          label='+/-'
          blackText
          color={Colors.lightGray}
          onPress={toggleSign}
        />

        <CalculatorButton
          label='del'
          blackText
          color={Colors.lightGray}
          onPress={deleteLastDigit}
        />

        <CalculatorButton
          label='÷'
          color={Colors.orange}
          onPress={divideOperation}
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton
          label='7'
          blackText
          onPress={() => buildNumber('7')}
        />

        <CalculatorButton
          label='8'
          blackText
          onPress={() => buildNumber('8')}
        />

        <CalculatorButton
          label='9'
          blackText
          onPress={() => buildNumber('9')}
        />

        <CalculatorButton
          label='×'
          color={Colors.orange}
          onPress={multiplyOperation}
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton
          label='4'
          blackText
          onPress={() => buildNumber('4')}
        />

        <CalculatorButton
          label='5'
          blackText
          onPress={() => buildNumber('5')}
        />

        <CalculatorButton
          label='6'
          blackText
          onPress={() => buildNumber('6')}
        />

        <CalculatorButton
          label='-'
          color={Colors.orange}
          onPress={substractOperation}
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton
          label='1'
          blackText
          onPress={() => buildNumber('1')}
        />

        <CalculatorButton
          label='2'
          blackText
          onPress={() => buildNumber('2')}
        />

        <CalculatorButton
          label='3'
          blackText
          onPress={() => buildNumber('3')}
        />

        <CalculatorButton
          label='+'
          color={Colors.orange}
          onPress={addOperation}
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton
          label='0'
          blackText
          doubleSize
          onPress={() => buildNumber('0')}
        />

        <CalculatorButton
          label='.'
          blackText
          onPress={() => buildNumber('.')}
        />

        <CalculatorButton
          label='='
          color={Colors.orange}
          onPress={calculateResult}
        />
      </View>


    </View>
  )
}

export default CalculatorApp