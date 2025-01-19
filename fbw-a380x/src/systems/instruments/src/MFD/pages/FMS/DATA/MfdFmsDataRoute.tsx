import { FSComponent, Subject, VNode } from '@microsoft/msfs-sdk';
import { AbstractMfdPageProps } from 'instruments/src/MFD/MFD';
import { Button } from 'instruments/src/MFD/pages/common/Button';
import { AirportFormat } from 'instruments/src/MFD/pages/common/DataEntryFormats';
import { FmsPage } from 'instruments/src/MFD/pages/common/FmsPage';
import { Footer } from 'instruments/src/MFD/pages/common/Footer';
import { InputField } from 'instruments/src/MFD/pages/common/InputField';
import { TopTabNavigator, TopTabNavigatorPage } from 'instruments/src/MFD/pages/common/TopTabNavigator';

interface MfdFmsDataRouteProps extends AbstractMfdPageProps {}

export class MfdFmsDataRoute extends FmsPage<MfdFmsDataRouteProps> {
  private readonly selectedPageIndex = Subject.create<number>(0);

  private readonly fromAirportIcao = Subject.create<string | null>(null);
  private readonly toAirportIcao = Subject.create<string | null>(null);

  protected onNewData(): void {}

  render(): VNode {
    return (
      <>
        {super.render()}
        {/* Begin page content */}
        <div class="mfd-page-container">
          <TopTabNavigator
            pageTitles={Subject.create(['DATABASE RTEs', 'PILOT STORED RTEs'])}
            selectedPageIndex={this.selectedPageIndex}
            pageChangeCallback={(val) => {
              this.selectedPageIndex.set(val);
            }}
            selectedTabTextColor="white"
            tabBarSlantedEdgeAngle={25}
          >
            <TopTabNavigatorPage containerStyle="height: 680px;">
              {/* DATABASE RTEs */}
              <div class="mfd-data-route-container">
                <div class="mfd-data-airport-input">
                  <div class="mfd-label" style={'position: relative; right: 50px;'}>
                    FROM
                  </div>
                  <div>
                    <InputField<string>
                      dataEntryFormat={new AirportFormat()}
                      dataHandlerDuringValidation={async (v) => {
                        this.fromAirportIcao.set(v);
                      }}
                      mandatory={Subject.create(true)}
                      canBeCleared={Subject.create(false)}
                      value={this.fromAirportIcao}
                      alignText="center"
                      errorHandler={(e) => this.props.fmcService.master?.showFmsErrorMessage(e)}
                      hEventConsumer={this.props.mfd.hEventConsumer}
                      interactionMode={this.props.mfd.interactionMode}
                      containerStyle="position: relative; right: 40px;"
                    />
                  </div>
                  <div class="mfd-label" style={'position: relative; left: 40px;'}>
                    TO
                  </div>
                  <div>
                    <InputField<string>
                      dataEntryFormat={new AirportFormat()}
                      dataHandlerDuringValidation={async (v) => {
                        this.toAirportIcao.set(v);
                      }}
                      mandatory={Subject.create(true)}
                      canBeCleared={Subject.create(false)}
                      value={this.toAirportIcao}
                      alignText="center"
                      errorHandler={(e) => this.props.fmcService.master?.showFmsErrorMessage(e)}
                      hEventConsumer={this.props.mfd.hEventConsumer}
                      interactionMode={this.props.mfd.interactionMode}
                      containerStyle="position: relative; left: 50px;"
                    />
                  </div>
                </div>
              </div>
            </TopTabNavigatorPage>
            <TopTabNavigatorPage containerStyle="height: 680px;">
              <div class="mfd-label" style={'align-self: center; position: relative; top: 45px;'}>
                NO PILOT STORED RTEs
              </div>
              <Button
                disabled={Subject.create(false)}
                label="NEW RTE"
                buttonStyle="width: 170px; height: 60px; position: absolute; right: 0; top: 630px"
                onClick={() => {}}
                menuItems={Subject.create([
                  {
                    label: 'COPY ACTIVE*',
                    action: () => {},
                  },
                  {
                    label: 'COPY SEC2 * ',
                    action: () => {},
                  },
                  {
                    label: 'COPY SEC2 * ',
                    action: () => {},
                  },
                  {
                    label: 'COPY SEC3 * ',
                    action: () => {},
                  },
                ])}
              />
            </TopTabNavigatorPage>
          </TopTabNavigator>
          <div style="flex-grow: 1;" />
          {/* fill space vertically */}
        </div>
        <Footer bus={this.props.bus} mfd={this.props.mfd} fmcService={this.props.fmcService} />
      </>
    );
  }
}
