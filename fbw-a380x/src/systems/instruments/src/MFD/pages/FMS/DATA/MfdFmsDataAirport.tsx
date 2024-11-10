import { FSComponent, Subject, VNode } from '@microsoft/msfs-sdk';
import { AbstractMfdPageProps } from 'instruments/src/MFD/MFD';
import { AirportFormat } from 'instruments/src/MFD/pages/common/DataEntryFormats';
import { FmsPage } from 'instruments/src/MFD/pages/common/FmsPage';
import { Footer } from 'instruments/src/MFD/pages/common/Footer';
import { InputField } from 'instruments/src/MFD/pages/common/InputField';
import { TopTabNavigator, TopTabNavigatorPage } from 'instruments/src/MFD/pages/common/TopTabNavigator';

import './MfdFmsDataAirport.scss';

interface MfdFmsDataAirportProps extends AbstractMfdPageProps {}

export class MfdFmsDataAirport extends FmsPage<MfdFmsDataAirportProps> {
  private selectedPageIndex = Subject.create<number>(0);

  private airportIdent = Subject.create<string | null>(null);

  private airportIdentEnteredByPilot = Subject.create<boolean>(false);

  protected onNewData() {
    if (!this.props.fmcService.master) {
      return;
    }
  }

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node);

    this.subs.push(
      this.props.mfd.uiService.activeUri.sub((val) => {
        if (val.extra === 'database-arpts') {
          this.selectedPageIndex.set(0);
        } else if (val.extra === 'pilot-stored-rwys') {
          this.selectedPageIndex.set(1);
        }
      }, true),
    );
  }

  render(): VNode {
    return (
      <>
        {super.render()}
        {/* begin page content */}
        <div class="mfd-page-container">
          <TopTabNavigator
            pageTitles={Subject.create(['DATABASE ARPTs', 'PILOT STORED RWYs'])}
            selectedPageIndex={this.selectedPageIndex}
            pageChangeCallback={(val) => {
              this.selectedPageIndex.set(val);
            }}
            selectedTabTextColor="white"
            tabBarSlantedEdgeAngle={25}
          >
            <TopTabNavigatorPage>
              {/* DATABASE ARPTs */}
              <div style="display: flex; flex-direction: row; align-self: center;">
                <div style="flex-direction: row; width: 40%; justify-content: space-between;">
                  <div class="mfd-label mfd-airport-ident-row">ARPT IDENT</div>
                  <div>
                    <InputField<string>
                      dataEntryFormat={new AirportFormat()}
                      value={this.airportIdent}
                      containerStyle="width: 125px;"
                      alignText="center"
                      errorHandler={(e) => this.props.fmcService.master?.showFmsErrorMessage(e)}
                      hEventConsumer={this.props.mfd.hEventConsumer}
                      interactionMode={this.props.mfd.interactionMode}
                    />
                  </div>
                </div>
              </div>
            </TopTabNavigatorPage>
            <TopTabNavigatorPage></TopTabNavigatorPage>
          </TopTabNavigator>
        </div>
        <Footer bus={this.props.bus} mfd={this.props.mfd} fmcService={this.props.fmcService} />
      </>
    );
  }
}
