import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {Link} from "react-router";
import {Panel, Button} from "react-bootstrap";
import {VelocityComponent, VelocityTransitionGroup, velocityHelpers} from "velocity-react";
import {VelocityAnimate, VelocityUi} from "velocity-animate";
import $ from "jquery";
//
import {createPost} from "../actions/actions";
import {updateState} from "../toolbox/toolbox";
//
function validate(values)
{
	const errors
		= {};
	//
	// Any values assigned to the errors object will make the
	// form invalid and prevent it from being submitted through
	// the ReduxForm conduit.
	if(!values.firstname)
	{
		errors.firstname
		= "must include your first name";
	}
	if(!values.lastname)
	{
		errors.lastname
		= "must include your last name";
	}
	if(!values.birthcity)
	{
		errors.birthcity
		= "must include the name of the city where you were born";
	}
	return(errors);
}
class FormdemoLanding extends Component
{
	//*************************
	//*************************
	// Standard Methods
	//
	constructor(props)
	{
	    super(props);
	}
	getChildContext()
	{
		// empty
	}
	getInitialState()
	{
		return({});
	}
	componentWillMount()
	{
		// empty
	}
	componentWillUnmount()
	{
		// empty
	}
	componentDidMount()
	{
		let scopeProxy
			= this;
		let setViewLoaded
			= this.context.setViewLoaded;
		let setLayoutMode
			= this.context.setLayoutMode;
		let navigationSection
			= 0;
		let updateNavigationState
			= this.context.updateNavigationState;
		//
		updateNavigationState(navigationSection);
		//
		let setviewTimeout =
			setTimeout(function()
			{
				setViewLoaded(true);
				setLayoutMode("full");
			},
			500);
		//
		updateState(scopeProxy,
		{
			"Ready":false,
			"Portal":
			{
				"Style":
				{
					"transform-style":"preserve-3d",
					"perspective":"1000px"
				},
				"Profile":
				{
					"runOnMount":false
				}
			},
			"Wallpaper":
			{
				"Style":{}
			},
			"Heading":
			{
				"Style":{}
			},
			"Panel":
			{
				"Style":{}
			},
			"Forminput":
			{
				"Selected":
				{
					"Element":
					{
						"Id":null
					}
				}
			},
			"Fields":
			{
				"Hasconsent":
				{
					"Checked":true
				}
			}
		});
	}
	componentWillUpdate()
	{
		// empty
	}
	componentDidUpdate()
	{
		let scopeProxy
			= this;
		//
		window.requestAnimationFrame(function()
		{
			if(scopeProxy.state !== undefined
			&& scopeProxy.state.Ready === false)
			{
				updateState(scopeProxy,
				{
					"Ready":true
				});
				scopeProxy.setListeners();
			}
		});
	}
	render()
	{
		const handleSubmit
			= this.props.handleSubmit;
		const firstname
			= this.props.fields.firstname;
		const lastname
			= this.props.fields.lastname;
		const birthcity
			= this.props.fields.birthcity;
		//
		let scopeProxy
			= this;
		let jsonReady
			= true;
		let profileReady
			= true;
		//
		let portalmorphProfileOnmount =
			{
				"runOnMount":false
			}
		//
		let portalmorphStyle =
			{
				"display":"block",
				"position":"absolute",
				"visibility":"hidden",
				"opacity":"0",
				"top":"0",
				"left":"0",
				"width":"0",
				"height":"0"
			}
		//
		let formdemoPanelhostStyle
			= _.has(this, "state.Portal.Style")
			? this.state.Portal.Style
			: null;
		let formdemoWallpaperStyle
			= _.has(this, "state.Wallpaper.Style")
			? this.state.Wallpaper.Style
			: null;
		let formdemoHeadingStyle
			= _.has(this, "state.Heading.Style")
			? this.state.Heading.Style
			: null;
		let formpanelStyle
			= _.has(this, "state.Panel.Style")
			? this.state.Panel.Style
			: null;
		let portalmorphProfile
			= _.has(this, "state.Portal.Profile")
			? this.state.Portal.Profile
			: portalmorphProfileOnmount;
		let hasconsentChecked
			= _.has(this, "state.Fields.Hasconsent.Checked")
			? this.state.Fields.Hasconsent.Checked
			: true;
		//
		if(jsonReady === true
		&& profileReady === true)
		{
			return(
				<div id="formdemo-panelhost-container" className="formdemo-panelhost" style={formdemoPanelhostStyle}>
					<div id="formdemo-wallpaper-container" className="formdemo-wallpaper" style={formdemoWallpaperStyle}></div>
					<div id="formdemo-panelparent-container" className="formdemo-panelparent">
						<div id="formdemo-header-container" className="formdemo-header" style={formdemoHeadingStyle}>
							<div id="header-logohost-container" className="header-logohost">
								<div id="header-formlogo-container" className="header-formlogo">
									<div id="header-logobadge-container" className="header-logobadge"></div>
									<div id="header-headline-container" className="header-headline">
										MEDCOMPANY
									</div>
								</div>
								<div id="header-logocaption-container" className="header-logocaption">
									Medcompany Efficacy Study
								</div>
							</div>
						</div>
						<div id="formdemo-formpanel-container" ref="formdemoformpanel" className="formdemo-formpanel" style={formpanelStyle}>
							<div id="formdemo-efficacyform-container" className="formdemo-efficacyform">
								<form id="efficacy-form-container" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
									<div id="formpanel-header-container" className="formpanel-header">
										<div>Voluntary Participation</div>
									</div>
									<div id="formpanel-message-container" className="formpanel-message">
										<p>Participation in this study is voluntary. If you do not wish to participate, there will be no penalty of any kind.</p>
										<p>To confirm you intent to enroll in this study, please complete the form below.</p>
									</div>
									<div id="formpanel-namefieldcluster-container" className="formpanel-namefieldcluster">
										<div className={`namefieldcluster-inputgroup form-group ${firstname.touched && firstname.invalid ? "has-danger" : ""}`}>
											<label className="inputfield-firstname">First Name</label>
											<input id="firstname-input-field" type="text" placeholder="enter your first name" className="form-control" {...firstname}/>
											<div className="validation-hint">
												{firstname.touched ? firstname.error : ""}
											</div>
										</div>
										<div className={`namefieldcluster-inputgroup form-group ${lastname.touched && lastname.invalid ? "has-danger" : ""}`}>
											<label className="inputfield-lastname">Last Name</label>
											<input id="lastname-input-field" type="text" placeholder="enter your last name" className="form-control" {...lastname}/>
											<div className="validation-hint">
												{lastname.touched ? lastname.error : ""}
											</div>
										</div>
									</div>
									<div id="formpanel-birthcity-container" className="formpanel-birthcitycluster">
										<div className={`namefieldcluster-inputgroup form-group ${birthcity.touched && birthcity.invalid ? "has-danger" : ""}`}>
											<label className="inputfield-birthcity">What city were you born in?</label>
											<input id="birthcity-input-field" type="text" placeholder="enter your city of birth" className="form-control" {...birthcity}/>
											<div className="validation-hint">
												{birthcity.touched ? birthcity.error : ""}
											</div>
										</div>
									</div>
									<div id="formpanel-consentbox-container" className="formpanel-consentbox">
										<div className="consentbox-checkbox form-group ">
											<input id="hasconsent-input-field" type="checkbox" onChange={scopeProxy.hasconsentChanged.bind(this)} defaultChecked={true} className="consentbox-control" />
											<label className="consentbox-consentlabel">I consent to participate in the study.</label>
											<div className="validation-hint">
												{!hasconsentChecked ? "checkbox must be checked to continue" : ""}
											</div>
										</div>
									</div>
									<div id="formpanel-buttoncluster-container" className="formpanel-buttoncluster">
										<div id="buttoncluster-backbutton-container" className="buttoncluster-backbutton">
											<button type="button" className="btn btn-danger formpanel-cancelbutton">&lt;</button>
										</div>
										<div id="buttoncluster-continuebutton-container" className="buttoncluster-continuebutton">
											<button type="submit" disabled={!hasconsentChecked} className={`btn btn-primary formpanel-submitbutton ${(!firstname.invalid && !lastname.invalid && !birthcity.invalid && hasconsentChecked) ? "" : "disabled"}`}>Continue to Enrollment</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
					<VelocityComponent {...portalmorphProfile}>
						<div id="portal-morph-container" ref="portalmorph" style={portalmorphStyle}></div>
					</VelocityComponent>
				</div>
			);
		}
		else
		{
			return(
				<div id="wares-landing-container" ref="wareslanding" className="wares-landing">
					"Loading Formdemo Content..."
				</div>
			);
		}
	}
	//*************************
	//*************************
	// Specialized Methods
	//
	setListeners()
	{
		let scopeProxy
			= this;
		let firstnameInputElement
			= document.getElementById("firstname-input-field");
		let lastnameInputElement
			= document.getElementById("lastname-input-field");
		let birthcityInputElement
			= document.getElementById("birthcity-input-field");
		let formpanelElement
			= document.getElementById("formdemo-panelparent-container");
		//
		firstnameInputElement.addEventListener("focus", (event)=>
		{
			scopeProxy.inputfieldOnFocus(
			{
				"Input":
				{
					"Id":"firstname-input-field"
				}
			});
			event.stopPropagation();
		});
		firstnameInputElement.addEventListener("click", (event)=>
		{
			event.stopPropagation();
		});
		lastnameInputElement.addEventListener("focus", (event)=>
		{
			scopeProxy.inputfieldOnFocus(
			{
				"Input":
				{
					"Id":"lastname-input-field"
				}
			});
			event.stopPropagation();
		});
		lastnameInputElement.addEventListener("click", (event)=>
		{
			event.stopPropagation();
		});
		birthcityInputElement.addEventListener("focus", (event)=>
		{
			scopeProxy.inputfieldOnFocus(
			{
				"Input":
				{
					"Id":"birthcity-input-field"
				}
			});
			event.stopPropagation();
		});
		birthcityInputElement.addEventListener("click", (event)=>
		{
			event.stopPropagation();
		});
		formpanelElement.addEventListener("click", (event)=>
		{
			scopeProxy.dollyzoomRestore();
		});
	}
	hasconsentChanged(event)
	{
		let scopeProxy
			= this;
		let isChecked
			= scopeProxy.state.Fields.Hasconsent.Checked;
		//
		updateState(scopeProxy,
		{
			"Fields":
			{
				"Hasconsent":
				{
					"Checked":!isChecked
				}
			}
		});
	}
	inputfieldOnFocus(Parcel)
	{
		let scopeProxy
			= this;
		let forminputId
			= Parcel.Input.Id;
		let currentlySelectedId
			= this.state.Forminput.Selected.Element.Id;
		//
		if(currentlySelectedId === null)
		{
			updateState(scopeProxy,
			{
				"Forminput":
				{
					"Selected":
					{
						"Id":forminputId
					}
				}
			});
			scopeProxy.dollyzoomApply();
		}
	}
	dollyzoomApply()
	{
		let scopeProxy
			= this;
		//
		let portalProfile =
			{
				"Profile":
				{
					"duration":300,
					"easing":"easeOutQuad",
					"runOnMount":false,
					"animation":
					{
						"opacity":1
					},
					"progress":(elements, complete, remaining, start, tweenValue)=>
					{
						// http://velocityjs.org/
						// The value of tweenValue is being reported as null for
						// unknown reasons. In order to tween the rotation according
						// to the easing, the actual value of the opacity must be
						// used as it tweens from zero to one. Additionally, at the
						// completion of the tween, the value of the opacity is set
						// back to zero by Velocity. This must be avoided so that the
						// rotation of the sections does not revert to its original
						// rotation value.
						//
						let progressValue
							= (elements[0].style.opacity > 0)
							? parseFloat(elements[0].style.opacity)
							: 1;
						let translateValue
							= (-8 * progressValue).toString().concat("px");
						let blurValue
							= (Math.abs(parseInt(10)) * progressValue * parseFloat(.2)).toString().concat("px");
						let opacityValue
							= 1
							- (1 - .9) * progressValue;
						let grayscaleValue
							= ((1 - .9) * progressValue * 100).toString().concat("%");
						let zoomValue
							= (parseFloat(1.01) - parseFloat(1)) * progressValue
							+ parseFloat(1);
						let wallpaperTransformValue
							= "translateZ(".concat(translateValue, ")");
						let headingTransformValue
							= "translateZ(".concat(translateValue, ") translateX(-50%)");
						//
						updateState(scopeProxy,
						{
							"Wallpaper":
							{
								"Style":
								{
									"transform":wallpaperTransformValue,
									"filter":"blur(".concat(blurValue, ") grayscale(", grayscaleValue, ")"),
									"opacity":opacityValue
								}
							},
							"Heading":
							{
								"Style":
								{
									"transform":headingTransformValue,
									"filter":"blur(".concat(blurValue, ") grayscale(", grayscaleValue, ")"),
									"opacity":opacityValue
								}
							},
							"Panel":
							{
								"Style":
								{
									"transform":"scale(".concat(zoomValue.toString(), ") translateY(-50%)")
								}
							}
						});
					},
					"complete":(event)=>
					{
						// empty
					}
				}
			}
		//
		updateState(scopeProxy,
		{
			"Portal":portalProfile
		});
	}
	dollyzoomRestore()
	{
		let scopeProxy
			= this;
		//
		let portalProfile =
			{
				"Profile":
				{
					"duration":300,
					"easing":"easeOutQuad",
					"runOnMount":false,
					"animation":
					{
						"opacity":0
					},
					"progress":(elements, complete, remaining, start, tweenValue)=>
					{
						// http://velocityjs.org/
						// The value of tweenValue is being reported as null for
						// unknown reasons. In order to tween the rotation according
						// to the easing, the actual value of the opacity must be
						// used as it tweens from zero to one. Additionally, at the
						// completion of the tween, the value of the opacity is set
						// back to zero by Velocity. This must be avoided so that the
						// rotation of the sections does not revert to its original
						// rotation value.
						//
						let progressValue
							= (elements[0].style.opacity > 0)
							? parseFloat(elements[0].style.opacity)
							: 0;
						let translateValue
							= (-8 * progressValue).toString().concat("px");
						let blurValue
							= (Math.abs(parseInt(10)) * progressValue * parseFloat(.2)).toString().concat("px");
						let opacityValue
							= 1
							- (1 - .9) * progressValue;
						let grayscaleValue
							= ((1 - .9) * progressValue * 100).toString().concat("%");
						let zoomValue
							= (parseFloat(1.01) - parseFloat(1)) * progressValue
							+ parseFloat(1);
						let wallpaperTransformValue
							= "translateZ(".concat(translateValue, ")");
						let headingTransformValue
							= "translateZ(".concat(translateValue, ") translateX(-50%)");
						//
						updateState(scopeProxy,
						{
							"Wallpaper":
							{
								"Style":
								{
									"transform":wallpaperTransformValue,
									"filter":"blur(".concat(blurValue, ") grayscale(", grayscaleValue, ")"),
									"opacity":opacityValue
								}
							},
							"Heading":
							{
								"Style":
								{
									"transform":headingTransformValue,
									"filter":"blur(".concat(blurValue, ") grayscale(", grayscaleValue, ")"),
									"opacity":opacityValue
								}
							},
							"Panel":
							{
								"Style":
								{
									"transform":"scale(".concat(zoomValue.toString(), ") translateY(-50%)")
								}
							}
						});
					},
					"complete":(event)=>
					{
						// empty
					}
				}
			}
		//
		updateState(scopeProxy,
		{
			"Portal":portalProfile
		});
	}
	onSubmit(props)
	{
		this.props.createPost(props)
		.then(() =>
		{
			// blog post successful
			// navigate to new path.
			//
			//this.context.router.push("/");

			console.log("----- onSubmit:", props);
		});
	}
	//*************************
	//*************************
	// Assignments
	//
	static contextTypes =
		{
			"transitionBody":PropTypes.func,
			"updateNavigationState":PropTypes.func,
			"setViewLoaded":PropTypes.func,
			"setLayoutMode":PropTypes.func
		}
	//
}
export default reduxForm(
{
	"form":"PostsNewForm",
	"fields":["firstname", "lastname", "birthcity"],
	"validate":validate
}, null,
{
	"createPost":createPost
})(FormdemoLanding);