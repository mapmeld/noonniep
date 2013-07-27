# MacCrowdBot.py
# This program runs on a host Mac connected to the Arduino
# It checks for pending sketches on the Noonniep server, and uploads them to the board

# basic functionality libraries
import time, urllib, os, json
# experimental data livestream
# install PySerial from http://pyserial.sourceforge.net
# also configure serial.Serial line to appropriate Arduino USB port
import datetime, serial

# configure app instance for your installation
appinstance = "http://noonniep.herokuapp.com"

loops = 0
# while loops < 125: # 125 loops x 1 minute > 2 hours
while loops < 125:
    programdata = json.loads( urllib.urlopen(appinstance + '/program/latest').read() )
    if(programdata != { }):
        program = ""
        dostream = "TRUE"
        if(programdata.has_key("code")):
          program = programdata["code"] # assume Wiring
        
        # fix Serial communication bug by adding an error handler
        # code from http://rowley.zendesk.com/entries/46177-undefined-reference-to-cxa-pure-virtual-error-message
        if((program.find('Serial.begin') > -1) and (program.find('void __cxa_pure_virtual()') == -1)):
            program = program + '\n\nextern "C" void __cxa_pure_virtual(){\n  while (1);\n}'

        # do not run programs which write to EEPROM - these can overwrite or even break the Arduino's memory
        if(program.find('EEPROM') > -1):
            continue

        # create a folder to store the program
        myfilename = 'runitnow'
        if(os.path.exists(myfilename) == False):
            os.mkdir(myfilename)
        os.system('cp SConstruct ' + myfilename + '/')
        saveprogram = open(myfilename + '/' + myfilename + '.pde','w')
        #program = '  #include <Arduino.h>\n' + program
        saveprogram.write(program)
        saveprogram.close()
        os.chdir(myfilename)
        response = os.system('scons ARDUINO_BOARD="uno" ARDUINO_PORT="/dev/tty.usbmodemfa131" upload')
        # response could feasibly be checked for compilation / upload errors
        print response
        msstart = datetime.datetime.now()
        #time.sleep(120)
        # see if user has asked to check serial port
        if(dostream == "TRUE"):
            # init data archive
            outbox = ""
            # open serial port - configure to your computer!
            ser = serial.Serial('/dev/tty.usbmodemfa131', 9600, timeout=0.5)
            # attempt to read serial while program runs for the next two minutes
            while( (datetime.datetime.now() - msstart).seconds < 120 ):
                line = ser.readline().replace('\r','').replace('\n','')
                if(line.replace(' ','').replace('    ','') != ""):
                    # send streaming data to server
                    print line
                    if(dostream == "TRUE"):
                        urllib.urlopen(appinstance + '/speak', urllib.urlencode({'info':line}))

            # close serial port
            ser.close()
        else:
            # let program run for two minutes
            time.sleep(120)
    else:
        # wait one minute and try for a new pending program
        print "no new program"
        time.sleep(60)
    loops = loops + 1
